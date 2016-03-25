var Scraper = require(__appbase + 'controllers/scraper/regions');
var Region = require(__appbase + 'models/region');
var Regions = require(__appbase + 'stores/regions');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(policy, callback) {
        module.exports.policy = policy;
        console.log('Filling started.');

        var afterInsertion = function()
        {
            var endInsertion = function() {
                console.log('Filling done =).');
                callback(false);
            }

            var file = __base + 'data/regions.json';
            console.log('Add additional data from file '+ file);
            jsonfile.readFile(file, function(err, obj) {
                if(!err && obj.length > 0) {
                    module.exports.addDataToDb(obj,function(err){
                        endInsertion();
                    });
                }
                else {
                    console.log('Could not open ' + file + ' to add additional data to the db.');
                    endInsertion();
                }
            });
        };

        var file = __tmpbase + 'regions.json';
        var scrape = function(){
            Scraper.scrapToFile(file, Scraper.getAll, function (err, obj) {
                if (err !== null) {
                    console.log(err);
                } else {
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            });
        };

        jsonfile.readFile(file, function(err, obj) {
            if(obj !== undefined) {
                var cacheAge = ((new Date()) - new Date(obj.createdAt));
                if(cacheAge > cfg.TTLWikiCache) {
                    console.log('Cache file outdated.');
                    scrape();
                } else {
                    console.log('Regions from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        Region.remove({}, function(err) {
            console.log('collection removed');
            callback();
        });
    },
    matchToModel: function(region) {
        // go through the properties of the house
        for(var z in region) {
            // ignore references for now, later gather the ids and edit the entries
            if (z == 'continent' || z == 'neighbours' || z == 'events' || z == 'cultures' || !Region.schema.paths.hasOwnProperty(z)) {
                delete region[z];
            }

            // remove spaces and html tags
            if (typeof region[z] == 'string') {
                region[z] = region[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return region;
    },
    insertToDb: function(regions, callback) {
        console.log('Inserting into db..');

        var addRegion = function(region, callb) {
            Regions.add(region, function (success, data) {

                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (regions) {
            // iterate through regions
            async.each(regions, function (region, _callback) {
                    // name is required
                    if (!region.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    region = module.exports.matchToModel(region);

                    if(module.exports.policy == 1) { // empty db, so just add it
                        addRegion(region, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Regions.getByName(region.name,function(success,oldRegion){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in region) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (module.exports.policy == 2 || oldRegion[z] === undefined)) {
                                        if(oldRegion[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldRegion[z] = region[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(region.name + " is updated.");
                                    oldRegion.updatedAt = new Date();
                                    oldRegion.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(region.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addRegion(region, function(suc){_callback();});
                            }
                        });

                    }
                },
                function (err) { callback(true); }
            );
        };

        // delete the collection before the insertion?
        if(module.exports.policy == 1) {
            console.log("Delete and refill policy. Deleting collection..");
            module.exports.clearAll(function() {insert(regions);});
        }
        else {
            insert(regions);
        }
    },
    addDataToDb: function(data,callback) {

        var createNewRegion = function(data,callb) {
            var newRegion = new Region();
            newRegion.name = data.name;
            if (data.hasOwnProperty('color')) {
                newRegion.color = data.color;
            }
            if (data.hasOwnProperty('path')) {
                newRegion.borders = data.path;
            }
            newRegion.save(function(err){
                if(err) {
                    console.log(err);
                    callb(true);
                }
                else {
                    callb(false);
                }
            });
        }

        var notFoundRegions = [];

       async.each(data, function (region, _callb) {
            async.waterfall([
                function(cb) { cb(null, region); },

                function(region,cb) {
                    Region.findOne({'name': region.name},function(err,oldRegion){
                        if(!err && oldRegion != null){
                            if(region.hasOwnProperty('color')){
                                oldRegion.color = region.color;
                            }
                            if(region.hasOwnProperty('path')){
                                oldRegion.borders = region.path;
                            }
                            oldRegion.save(function(err){
                               console.log(oldRegion.name + ' got updated!');
                                cb(null)
                            });
                        }
                        else{
                            notFoundRegions.push(region.name);
                            createNewRegion(region,function(err){
                                cb(null)
                            });
                        }
                    });
                }
            ], function(err, result) {
                    _callb();
            });
        }, function (err) {
            console.log('Finished iteration');
            console.log('Following regions are not from wiki scraper: '+notFoundRegions.join(', '));
            if (err) {
                console.log(err);
                callback(true);
            }
            callback(false);
        });
    }
};