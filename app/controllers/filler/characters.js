var Scraper = require(__appbase + 'controllers/scraper/characters');
var Character = require(__appbase + 'models/character');
var Characters = require(__appbase + 'stores/characters');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__base + 'cfg/config.json');
var pageRankFile = __base + 'data/pageRanks.json';

module.exports = {
    fill: function(policy, callback) {
        module.exports.policy = policy;
        console.log('Filling started.');

        var afterInsertion = function()
        {
            console.log();
            console.log("Updating pageRanks..");
            jsonfile.readFile(pageRankFile,function(err,pageRanks) {
                module.exports.updatePageRanks(pageRanks, function (err) {
                    console.log('Filling done =).');
                    callback(false);
                });
            });
        };

        var file = __tmpbase + 'characters.json';
        var scrape = function(){
            Scraper.scrapToFile(file, Scraper.getAll, function (err, obj) {
                console.log('DONE WITH SCRAPING');
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

        var downloadImage = function(character, callb) {
            var fs = require('fs'),
                request = require('request');
            var uri = 'http://awoiaf.westeros.org/' + character.imageLink;
            var filename = '/misc/images/characters/' + character.name.replace(new RegExp(" ", "g"),"_");
            console.log(uri);
            request.head(uri, function(err, res, body){
                if(!err) {
                    var type = res.headers['content-type'].replace(new RegExp("/", "g"),'.');
                    var downloadTo = filename+'.'+type;
                    downloadTo = downloadTo.replace(".image",'');
                    request(uri).pipe(fs.createWriteStream(__appbase + '..' + downloadTo)).on('close', function() {
                        callb(false,downloadTo);
                    });
                }
                else {
                    callb(true,null);
                }
            });
        };

        var addCharacter = function(character, callb) {
            Characters.add(character, function (success, data) {

                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function(character,_callback) {
            character = module.exports.matchToModel(character);

            if(module.exports.policy == 1) { // empty db, so just add it
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
                            if(z != "_id" && (module.exports.policy == 2 || oldCharacter[z] === undefined)) {
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
        };

        var insertAll = function (characters) {
            // iterate through characters
            async.forEach(characters, function (character, _callback) {
                // name is required
                if (!character.hasOwnProperty('name')) {
                    _callback();
                    return;
                }

                if(character.imageLink !== undefined){
                    downloadImage(character, function(err, newImageLink){
                        if(!err) {
                            character.imageLink = newImageLink;
                        }
                        insert(character,_callback);
                    });
                }
                else {
                    insert(character,_callback);
                }
            },
            function (err) { callback(true); }
            );
        };

        // delete the collection before the insertion?
        if(module.exports.policy == 1) {
            console.log("Delete and refill policy. Deleting collection..");
            module.exports.clearAll(function() {
                insertAll(characters);
            });
        }
        else {
            insertAll(characters);
        }
    },
    updatePageRanks: function(ranks, callback) {
        console.log(ranks);
        async.forEach(ranks, function(rank,_callback){

            Character.find({'name':{ "$regex": rank.name, "$options": "i" }}, function (err, oldChar) {
                if (err || oldChar.length === 0) {
                    _callback();
                } else {
                    oldChar = oldChar[0];
                    oldChar.pageRank = rank.score;
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
    }
};