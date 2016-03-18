var Scraper = require(__appbase + 'controllers/scraper/cultures');
var Culture = require(__appbase + 'models/culture');
var Cultures = require(__appbase + 'stores/cultures');
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
                if(cacheAge > ttl.TTLWikiCache) {
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
    clearAll: function(req,res) {
        Culture.remove({}, function(err) {
            console.log('Cultures collection removed');
        });
    },
    matchToModel: function(culture) {
        // go through the properties of the house
        for(var z in culture) {
            // ignore references for now, later gather the ids and edit the entries
            if (!Culture.schema.paths.hasOwnProperty(z)) {
                delete culture[z];
            }

            // TODO: startDate, endDate, predescessor, successor
            // remove spaces and html tags
            if (typeof culture[z] == 'string') {
                culture[z] = culture[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return culture;
    },
    insertToDb: function(cultures, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through houses
        async.forEach(cultures, function (culture, _callback) {
                // name is required
                if (!culture.hasOwnProperty('name')) {
                    _callback();
                    return;
                }
                var filler = require(__appbase + 'controllers/filler/cultures');
                culture = filler.matchToModel(culture);
                // add house to db
                Cultures.add(culture, function (success, data) {
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
    }
};