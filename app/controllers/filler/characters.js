var Scraper = require(__appbase + 'controllers/scraper/characters');
var Character = require(__appbase + 'models/character');
var CharacterPlod = require(__appbase + 'models/characterPlod');
var Characters = require(__appbase + 'stores/characters');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__base + 'cfg/config.json');
var pageRankFile = __base + 'data/pageRanks.json';
var gotplod = require('gotplod');

module.exports = {
    fill: function(policy, callback) {
        module.exports.policy = policy;
        var cacheFile = __tmpbase + 'characters.json';
        console.log('Filling started.');

        async.waterfall([
            // check cache file
            function(cb) {
                jsonfile.readFile(cacheFile, function(err, obj) {
                    // no cache file
                    if(obj === undefined) {
                        cb(null, false); // scrap it!
                    }
                    else {

                        // cache outdated?
                        var cacheAge = ((new Date()) - new Date(obj.createdAt));
                        if(cacheAge > cfg.TTLWikiCache) {
                            cb(null,false); // scrap it!
                        }
                        else {
                            console.log('Characters from cache file "'+cacheFile+'". Not scrapped from wiki.');
                            cb(null,obj.data);
                        }

                    }

                });
            },
            // scraping required?
            function(characters,cb) {
                // scraping if characters not yet fetched
                if(!characters) {
                    Scraper.scrapToFile(cacheFile, Scraper.getAll, function (err, obj) {
                        console.log('DONE WITH SCRAPING');
                        if (err !== null) {
                            console.log(err);
                        } else {
                            cb(null,obj.data);
                        }
                    });
                }
                else {
                    cb(null,characters);
                }
            },
            // delete collection before filling?
            function(characters,cb) {
                if (module.exports.policy == 1) {
                    console.log("Delete and refill policy. Deleting collection..");
                    module.exports.clearAll(function () {
                        cb(null, characters);
                    });
                }
                else {
                    cb(null, characters);
                }
            },
            // at this step characters are fetched
            function(characters,cb) {
                module.exports.insertToDb(characters,function(err) {
                    if(err) {
                        console.log(err);
                    }
                    cb(null);
                });
            },
            // update page ranks
            function(cb) {
                console.log("Updating pageRanks..");
                jsonfile.readFile(pageRankFile,function(err,pageRanks) {
                    module.exports.updatePageRanks(pageRanks, function (err) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log('Filling done =).');
                            callback(false);
                        }
                    });
                });
            }
        ]);
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
            if (!Character.schema.paths.hasOwnProperty(z) || ((z == 'dateOfBirth' || z == 'dateOfDeath') && isNaN(character[z]))) {
                delete character[z];
            }

            // remove spaces and html tags
            if (typeof character[z] == 'string') {
                character[z] = character[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }
        return character;
    },
    insertToDb: function(characters, callback) {
        console.log('Inserting into db..');

        // iterate through characters
        async.forEach(characters, function (character, _callback) {
            // name is required
            if (!character.hasOwnProperty('name')) {
                _callback(); // skip character
            }
            else {
                async.waterfall([
                        // get or create character
                        function (cb) {
                            character = module.exports.matchToModel(character);

                            // empty db, so just create a new one
                            if (module.exports.policy == 1) {
                                var characterToSafe = new Character();
                                for (var prop in character) {
                                    characterToSafe[prop] = character[prop];
                                }
                                cb(null, characterToSafe);
                            }
                            else {
                                // get old character
                                Character.findOne({'name': character.name}, function (err, oldCharacter) {
                                    // old entry is not existing
                                    if (err || oldCharacter === null) {
                                        console.log('Character ' + character.name + ' is not existing yet!');
                                        console.log(err);
                                        console.log(oldCharacter);
                                        console.log('---');
                                        var characterToSafe = new Character();
                                        for (var prop in character) {
                                            characterToSafe[prop] = character[prop];
                                        }
                                        cb(null, characterToSafe);
                                    }
                                    // old entry is existing
                                    else {
                                        var isChange = false;
                                        for (var p in character) {
                                            if (module.exports.policy == 2 && oldCharacter[p] != character[p] && p !== '_id') { // just overwrite old perties
                                                oldCharacter[p] = character[p];
                                                isChange = true;
                                            }
                                            else if (oldCharacter[p] === undefined) { // just add new perties
                                                console.log(oldCharacter.name + ' gets new property ' + p + '(' + oldCharacter[p] + ' -> ' + character[p] + ')');
                                                oldCharacter[p] = character[p];
                                                isChange = true;
                                            }
                                        }

                                        if (!isChange) {
                                            console.log(oldCharacter.name + ' still up-to-date.');
                                        }
                                        else {
                                            oldCharacter.updatedAt = new Date();
                                        }

                                        cb(null, oldCharacter);
                                    }
                                });
                            }
                        },
                        // store updated or new character
                        function (characterToSafe, cb) {
                            characterToSafe.save(function (err) {
                                if (!err) {
                                    console.log('SUCCESS: ' + characterToSafe.name);
                                    cb(null);
                                }
                                else {
                                    console.log('ERROR: ' + err);
                                    cb(err);
                                }
                            });
                        }
                    ],
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                        _callback();
                    });
                }
            },
            function (err) {
                if(err) {
                    console.log(err);
                }
                callback(false);
            }
        );
    },
    updatePageRanks: function(ranks, callback) {
        async.forEach(ranks, function(rank,_callback){
            Character.find({'name':{ "$regex": rank.name, "$options": "i" }}, function (err, oldChar) {
                if (err || oldChar.length === 0) {
                    _callback();
                } else {
                    oldChar = oldChar[0];
                    oldChar.pageRank = rank.score;
/*
                    if(oldChar.imageLink === undefined) {
                        oldChar.pageRank /= 2;
                        console.log(oldChar.name + ' has no image. Score divided by two!');
                    }
*/
                    oldChar.save(function(err){
                        console.log(oldChar.name + ' got updated by the page rank ' + oldChar.pageRank);
                        if(err){
                            console.log('Error updating character: ' + err);

                        }
                        _callback();
                    });
                }
            });
        },function(err) {
            callback(false);
        });
    },
    updatePlods: function(policy,callback) {
        var plods = gotplod.getAllCharPLOD();

        var addNewPlod = function(char, plod, cb) {
            var newCharPlod = new CharacterPlod();
            newCharPlod.character = char;
            newCharPlod.plod = plod;
            newCharPlod.algorithm = 'gotplod.getAllCharPLOD()';
            newCharPlod.date = new Date();
            newCharPlod.characterSlug = char.replace(/'/g,'_').replace(/ /g,'_');
            newCharPlod.save(function(err){
                console.log(newCharPlod.character + ' has been newly added to the db with the plod ' + plod);
                if(err){
                    console.log('Error adding new plod: ' + err);
                }
                cb(false);
            });
        };

        if(policy === 1) {
            CharacterPlod.remove({}, function(err) {
                console.log('CharacterPlods cleared.');
                async.forEachOf(plods,function(plod, char, cb){
                    addNewPlod(char,plod,function() {
                       cb();
                    });
                }, function(err) {
                    callback(false);
                });
            });
        }
        else {
            var slug;
            async.forEachOf(plods,function(plod, char, cb){
                slug = char.replace(/'/g,'_').replace(/ /g,'_');
                CharacterPlod.findOne({'characterSlug':slug}, function (err, oldChar) {

                    if (err || oldChar === null || oldChar === undefined) {
                        console.log(char + ' is new!');
                        addNewPlod(char,plod,function() {
                            cb();
                        });
                    } else {
                        if(policy == 2 || (policy == 3 && oldChar.plod === undefined)) {
                            oldChar.plod = plod;
                            oldChar.algorithm = 'gotplod.getAllCharPLOD()';
                            oldChar.date = new Date();
                            oldChar.save(function(err){
                                console.log(oldChar.character + ' got updated by the plod ' + plod);
                                if(err){
                                    console.log('Error updating character: ' + err);

                                }
                                cb();
                            });
                        }
                        else {
                            console.log(oldChar.character + ' has already a plod assigned. Due to safeUpdate policy no change.');
                            cb();
                        }
                    }
                });
            },function(err) {
                if(err) {
                    console.log(err);
                }
                callback(false);
            });
        }
    }
};