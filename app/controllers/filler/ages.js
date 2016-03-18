var Scraper = require(__appbase + 'controllers/scraper/ages');
var Age = require(__appbase + 'models/age');
var Ages = require(__appbase + 'stores/ages');
var jsonfile = require('jsonfile');
var async = require('async');
var ttl = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function() {
            console.log('Filling done =).');
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
                if(cacheAge > ttl.TTLWikiCache) {
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
    clearAll: function(req,res) {
        Age.remove({}, function(err) {console.log('Ages collection removed');});
    },
    matchToModel: function(age) {
        // go through the properties of the house
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

        // iterate through houses
        async.forEach(ages, function (age, _callback) {
                var filler = require(__appbase + 'controllers/filler/ages');
                age = filler.matchToModel(age);
                // add house to db
                Ages.add(age, function (success, data) {
                    console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name );
                    _callback();
                });
            },
            function (err) { callback(true); }
        );
    }
};