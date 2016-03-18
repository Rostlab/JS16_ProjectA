var Scraper = require(__appbase + 'controllers/scraper/regions');
var Region = require(__appbase + 'models/region');
var Regions = require(__appbase + 'stores/regions');
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

        var file = __appbase + '../wikiData/regions.json';
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
                    console.log('Regions from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(req,res) {
        Region.remove({}, function(err) {
            console.log('collection removed');
        });
    },
    matchToModel: function(region) {
        // go through the properties of the house
        for(var z in region) {
            // ignore references for now, later gather the ids and edit the entries
            if (z == 'continent' || z == 'neighbours' || z == 'events' || z == 'cultures' || !Region.schema.paths.hasOwnProperty(z)) {
                delete region[z];
            }

            // remove spaces and html tags
            if (typeof region[z] == 'string') {
                region[z] = region[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return region;
    },
    insertToDb: function(regions, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through houses
        async.forEach(regions, function (region, _callback) {
                // name is required
                if (!region.hasOwnProperty('name')) {
                    _callback();
                    return;
                }

                var filler = require(__appbase + 'controllers/filler/regions');
                region = filler.matchToModel(region);
                // add house to db
                Regions.add(region, function (success, data) {
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