var Scraper = require(__appbase + 'controllers/scraper/characters');
var Character = require(__appbase + 'models/character');
var Characters = require(__appbase + 'stores/characters');
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

        var file = __appbase + '../wikiData/characters.json';
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
                    console.log('Characters from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        Character.remove({}, function(err) {
            console.log('Characters collection removed');
            callback();
        });
    },
    matchToModel: function(character) {
        // go through the properties of the character
        for(var z in character) {
            // ignore references for now, later gather the ids and edit the entries
            if ( z == 'skills' || !Character.schema.paths.hasOwnProperty(z)) {
                delete character[z];
            }

            // remove spaces and html tags
            if (typeof character[z] == 'string') {
                character[z] = character[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
            // translate to a number
            if (z == 'dateOfBirth' || z == 'dateOfDeath') {
                if (character[z].indexOf('AC') > -1 || character[z].indexOf('ac') > -1) {
                    character[z] = Math.abs(character[z].replace(/\D/g, ''));
                }
                else if (character[z].indexOf('BC') > -1 || character[z].indexOf('bc') > -1) {
                    character[z] = 0 - Math.abs(character[z].replace(/\D/g, ''));
                }
                else {
                    delete character[z]; // ignore it for now
                }
            }
        }

        return character;
    },
    insertToDb: function(characters, callback) {
        console.log('Inserting into db..');

        var addCharacter = function(character, callb) {
            Characters.add(character, function (success, data) {

                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (characters) {
            // iterate through characters
            async.forEach(characters, function (character, _callback) {
                    // name is required
                    if (!character.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    character = module.exports.matchToModel(character);

                    if(cfg.fillerPolicy == 1) { // empty db, so just add it
                        addCharacter(character, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Characters.getByName(character.name,function(success,oldCharacter){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in character) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (cfg.fillerPolicy == 2 || oldCharacter[z] === undefined)) {
                                        if(oldCharacter[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldCharacter[z] = character[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(character.name + " is updated.");
                                    oldCharacter.updatedAt = new Date();
                                    oldCharacter.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(character.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addCharacter(character, function(suc){_callback();});
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
            module.exports.clearAll(function() {insert(characters);});
        }
        else {
            insert(characters);
        }
    }
};