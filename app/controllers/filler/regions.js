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
            console.log('Filling done =).');
            callback(false);
        };

        var file = __appbase + '../wikiData/regions.json';
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
            async.forEach(regions, function (region, _callback) {
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
    }
};