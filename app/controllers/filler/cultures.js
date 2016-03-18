var Scraper = require(__appbase + 'controllers/scraper/cultures');
var Culture = require(__appbase + 'models/culture');
var Cultures = require(__appbase + 'stores/cultures');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function()
        {
            console.log('Filling done =).');
            res.sendStatus(200);
            return;
        };

        var file = __appbase + '../wikiData/cultures.json';
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
                    console.log('Cultures from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        Culture.remove({}, function(err) {
            console.log('Cultures collection removed');
            callback();
        });
    },
    matchToModel: function(culture) {
        // go through the properties of the house
        for(var z in culture) {
            // ignore references for now, later gather the ids and edit the entries
            if (!Culture.schema.paths.hasOwnProperty(z)) {
                delete culture[z];
            }

            // remove spaces and html tags
            if (typeof culture[z] == 'string') {
                culture[z] = culture[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return culture;
    },
    insertToDb: function(cultures, callback) {
        console.log('Inserting into db..');

        var addCulture = function(culture, callb) {
            Cultures.add(culture, function (success, data) {

                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (cultures) {
            // iterate through cultures
            async.forEach(cultures, function (culture, _callback) {
                    // name is required
                    if (!culture.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    culture = module.exports.matchToModel(culture);

                    if(cfg.fillerPolicy == 1) { // empty db, so just add it
                        addCulture(culture, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Cultures.getByName(culture.name,function(success,oldCulture){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in culture) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (cfg.fillerPolicy == 2 || oldCulture[z] === undefined)) {
                                        if(oldCulture[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldCulture[z] = culture[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(culture.name + " is updated.");
                                    oldCulture.updatedAt = new Date();
                                    oldCulture.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(culture.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addCulture(culture, function(suc){_callback();});
                            }
                        });

                    }
                },
                function (err) { callback(true); }
            );
        };

        // delete the collection before the insertion?
        if(cfg.fillerPolicy == 1) {
            console.log("Delete and refill policy. Deleting collection..");
            module.exports.clearAll(function() {insert(cultures);});
        }
        else {
            insert(cultures);
        }
    }
};