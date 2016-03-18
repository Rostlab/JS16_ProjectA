var Continent = require(__appbase + 'models/continent');
var Continents = require(__appbase + 'stores/continents');
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

        console.log('The continents are hardcoded. Not scrapped from wiki.');
        continents = require(__appbase + '../wikiData/continents');
        
        var filler = require(__appbase + 'controllers/filler/continents');
        filler.insertToDb(continents,afterInsertion);

    },
    clearAll: function(callback) {
        Continent.remove({}, function(err) {
            console.log('Continents collection removed');
            callback();
        });
    },
    matchToModel: function(continent) {
        // go through the properties of the continent
        for(var z in continent) {
            // ignore references for now, later gather the ids and edit the entries
            if (!Continent.schema.paths.hasOwnProperty(z)) {
                delete continent[z];
            }

            // remove spaces and html tags
            if (typeof continent[z] == 'string') {
                continent[z] = continent[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return continent;
    },
    insertToDb: function(continents, callback) {
        console.log('Inserting into db..');

        var addContinent = function(continent, callb) {
            Continents.add(continent, function (success, data) {

                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (continents) {
            // iterate through continents
            async.forEach(continents, function (continent, _callback) {
                    // name is required
                    if (!continent.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    continent = module.exports.matchToModel(continent);

                    if(cfg.fillerPolicy == 1) { // empty db, so just add it
                        addContinent(continent, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Continents.getByName(continent.name,function(success,oldContinent){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in continent) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (cfg.fillerPolicy == 2 || oldContinent[z] === undefined)) {
                                        if(oldContinent[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldContinent[z] = continent[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(continent.name + " is updated.");
                                    oldContinent.updatedAt = new Date();
                                    oldContinent.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(continent.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addContinent(continent, function(suc){_callback();});
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
            module.exports.clearAll(function() {insert(continents);});
        }
        else {
            insert(continents);
        }
    }
};