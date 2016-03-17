var Scraper = require(__appbase + 'controllers/scraper');
var Character = require(__appbase + 'models/character');
var Characters = require(__appbase + 'stores/characters');
var jsonfile = require('jsonfile');
var async = require('async');
var ttl = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function()
        {
            console.log('Filling done =).');
        };

        var file = __appbase + '../wikiData/characters.json';
        var scrape = function(){
            Scraper.scrapToFile(file, Scraper.getCharacters, function (err, obj) {
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
                if(cacheAge > ttl.TTLWikiCache) {
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
    clearAll: function(req,res) {
        Character.remove({}, function(err) {
            console.log('Characters collection removed');
        });
    },
    matchToModel: function(character) {
        // go through the properties of the house
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
        var i = 0;

        // iterate through houses
        async.forEach(characters, function (character, _callback) {
                // name is required
                if (!character.hasOwnProperty('name')) {
                    _callback();
                    return;
                }

                var filler = require(__appbase + 'controllers/filler/characters');
                character = filler.matchToModel(character);
                // add house to db
                Characters.add(character, function (success, data) {
                    if (success != 1) {
                        console.log('Problem:' + data);
                    }
                    else {
                        console.log('SUCCESS: ' + data.name);
                    }
                    _callback();
                });
            },
            function (err) {
                callback(true);
            });
    },
    addReferences: function(req,res) {
        // TODO: Still every db entry has to be edited and the references updated
    }
};