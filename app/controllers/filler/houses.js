var Scraper = require(__appbase + 'controllers/scraper');
var House = require(__appbase + 'models/house');
var Houses = require(__appbase + 'stores/houses');
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

        var file = __appbase + '../wikiData/houses.json';
        var scrape = function(){
            Scraper.scrapToFile(file, Scraper.getHouses, function (err, obj) {
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
                    console.log('Houses from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(req,res) {
        House.remove({}, function(err) {
            console.log('collection removed');
        });
    },
    matchToModel: function(house) {
        // go through the properties of the house
        for(var z in house) {
            if(z == 'died out')
            {
                house.isExtinct = true;
            }

            // ignore references for now, later gather the ids and edit the entries
            if (!House.schema.paths.hasOwnProperty(z)) {
                delete house[z];
            }

            // remove spaces and html tags
            if (typeof house[z] == 'string') {
                house[z] = house[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }

            // translate founded to a number
            if (z == 'founded') {
                if (house[z].indexOf('AC') > -1 || house[z].indexOf('ac') > -1) {
                    house[z] = Math.abs(house[z].replace(/\D/g, ''));
                }
                else if (house[z].indexOf('BC') > -1 || house[z].indexOf('bc') > -1) {
                    house[z] = 0 - Math.abs(house[z].replace(/\D/g, ''));
                }
                else {
                    // TODO: it is the name of an age, which has to be transformed into a date

                    delete house[z]; // ignore it for now
                }
            }
        }

        return house;
    },
    insertToDb: function(houses, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through houses
        async.forEach(houses, function (house, _callback) {
                // name is required
                if (!house.hasOwnProperty('name')) {
                    _callback();
                    return;
                }

                var filler = require(__appbase + 'controllers/filler/houses');
                house = filler.matchToModel(house);
                // add house to db
                Houses.add(house, function (success, data) {
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