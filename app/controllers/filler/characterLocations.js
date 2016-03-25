var Scraper = require(__appbase + 'controllers/scraper/characterLocations');
var CharacterLocations = require(__appbase + 'models/characterLocations');
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

        var file = __tmpbase + 'characterLocations.json';
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
                    console.log('CharacterLocations from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        CharacterLocations.remove({}, function(err) {
            console.log('collection removed');
            callback();
        });
    },
    matchToModel: function(characterLocation) {
        // go through the properties of the house
        for(var z in characterLocation) {
            // ignore references for now, later gather the ids and edit the entries
            if (!CharacterLocations.schema.paths.hasOwnProperty(z)) {
                delete characterLocation[z];
            }

            // remove spaces and html tags
            if (typeof characterLocation[z] == 'string') {
                characterLocation[z] = characterLocation[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return characterLocation;
    },
    insertToDb: function(characterLocations, callback) {
        console.log('Inserting into db..');

        var addCharacterLocations = function(characterLocation, callb) {
            if(characterLocation.locations.length < 1) {
                callb(true);
                return;
            }
            var entry = new CharacterLocations();
            entry.name = characterLocation.name;
            entry.slug = characterLocation.slug;
            entry.locations = characterLocation.locations;

            entry.save(function (err) {
                console.log((err) ? 'Problem:' + err : 'SUCCESS: ' + entry.name);
                callb(true);
            });
        };

        var insert = function (characterLocations) {
            // iterate through regions
            async.forEach(characterLocations, function (characterLocation, _callback) {
                    // name is required
                    if (!characterLocation.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    characterLocation = module.exports.matchToModel(characterLocation);

                    if(module.exports.policy == 1) { // empty db, so just add it
                        addCharacterLocations(characterLocation, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        CharacterLocations.find({'slug':characterLocation.slug},function(err,oldCharacterLocation){
                            if(!err) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in oldCharacterLocation) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (module.exports.policy == 2 || oldCharacterLocation[z] === undefined)) {
                                        if(oldCharacterLocation[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldCharacterLocation[z] = oldCharacterLocation[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(characterLocation.name + " is updated.");
                                    oldCharacterLocation.updatedAt = new Date();
                                    oldCharacterLocation.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(oldCharacterLocation.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addCharacterLocations(characterLocation, function(suc){_callback();});
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
            module.exports.clearAll(function() {insert(characterLocations);});
        }
        else {
            insert(characterLocations);
        }
    }
};