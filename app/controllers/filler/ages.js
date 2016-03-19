var Scraper = require(__appbase + 'controllers/scraper/ages');
var Age = require(__appbase + 'models/age');
var Ages = require(__appbase + 'stores/ages');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(policy, callback) {
        module.exports.policy = policy;
        console.log('Filling started.');

        var afterInsertion = function() {
            console.log('Filling done =).');
            callback(false);
        };

        var file = __appbase + '../wikiData/ages.json';
        var scrape = function() {
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
                    console.log('Ages from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        Age.remove({}, function(err) {
            console.log('Ages collection removed');
            callback();
        });
    },
    matchToModel: function(age) {
        // go through the properties of the age
        for(var z in age) {
            // ignore references for now, later gather the ids and edit the entries
            if (!Age.schema.paths.hasOwnProperty(z)) {
                delete age[z];
            }

            // translate startDate to (negative) number
            if( z == 'startDate') {
                if(age[z].indexOf('BC')>-1) {
                    age[z] = 0 - age[z].replace(/[^0-9\.]/g, '');
                }
                else if(age[z].indexOf('AC')>-1) {
                    age[z] = age[z].replace(/[^0-9\.]/g, '');
                }
                else if(age[z].indexOf('ca')>-1) {
                    age[z] = age[z].replace('ca.','').replace(',','');
                }
                else {
                    delete age[z];
                }
            }

            // translate startDate to (negative) number
            if( z == 'endDate') {
                if(age[z].indexOf('BC')>-1) {
                    age[z] = 0 - age[z].replace(/[^0-9\.]/g, '');
                }
                else if(age[z].indexOf('282-283 AC')>-1) { //hardcoded =/
                    age[z] = 283;
                }
                else if(age[z].indexOf('AC')>-1) {
                    age[z] = age[z].replace(/[^0-9\.]/g, '');
                }
                else if(age[z].indexOf('~')>-1) {
                    age[z] = age[z].replace('~', '');
                }
                else if(age[z].indexOf('ca')>-1) {
                    age[z] = age[z].replace('ca.','').replace(',','').replace(' ','');
                }
                else {
                    delete age[z];
                }
            }

            // remove spaces and html tags
            if (typeof age[z] == 'string') {
                age[z] = age[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return age;
    },
    insertToDb: function(ages, callback) {
        console.log('Inserting into db..');

        var addAge = function(age, callb) {
            Ages.add(age, function (success, data) {
                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (ages) {
            // iterate through ages
            async.forEach(ages, function (age, _callback) {
                    // name is required
                    if (!age.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    age = module.exports.matchToModel(age);

                    if(module.exports.policy == 1) { // empty db, so just add it
                        addAge(age, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Ages.getByName(age.name,function(success,oldAge){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in age) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (module.exports.policy == 2 || oldAge[z] === undefined)) {
                                        if(oldAge[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldAge[z] = age[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(age.name + " is updated.");
                                    oldAge.updatedAt = new Date();
                                    oldAge.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(age.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addAge(age, function(suc){_callback();});
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
            module.exports.clearAll(function() {insert(ages);});
        }
        else {
            insert(ages);
        }
    }
};