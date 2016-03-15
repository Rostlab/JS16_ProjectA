var Scraper = require(__appbase + 'controllers/scraper');
var Event = require(__appbase + 'models/event');
var Events = require(__appbase + 'stores/events');
var jsonfile = require('jsonfile');
var async = require('async');
var ttl = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function() {
            console.log('Filling done =).');
        };

        var file = __appbase + '../wikiData/events.json';
        var scrape = function(){
            Scraper.scrapToFile(file, Scraper.getEvents, function (err, obj) {
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
                    console.log('Events from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(req,res) {
        Event.remove({}, function(err) {
            console.log('Events collection removed');
        });
    },
    matchToModel: function(event) {
        // go through the properties of the event
        for(var z in event) {
            // ignore references for now, later gather the ids and edit the entries
            if (!Event.schema.paths.hasOwnProperty(z)) {
                delete event[z];
            }

            // remove spaces and html tags
            if (typeof event[z] == 'string') {
                event[z] = event[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
            // translate date to a number
            if (z == 'date') {
                if (event[z].indexOf('AC') > -1 || event[z].indexOf('ac') > -1) {
                    event[z] = Math.abs(event[z].replace(/\D/g, ''));
                }
                else if (event[z].indexOf('BC') > -1 || event[z].indexOf('bc') > -1) {
                    event[z] = 0 - Math.abs(event[z].replace(/\D/g, ''));
                }
                else {
                    delete event[z]; // ignore it for now
                }
            }
        }

        return event;
    },
    insertToDb: function(events, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through events
        async.forEach(events, function (event, _callback) {
            var filler = require(__appbase + 'controllers/filler/events');
            event = filler.matchToModel(event);
            // add event to db
            Events.add(event, function (success, data) {
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