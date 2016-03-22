var Scraper = require(__appbase + 'controllers/scraper/events');
var Event = require(__appbase + 'models/event');
var Events = require(__appbase + 'stores/events');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(policy,callback) {
        module.exports.policy = policy;
        console.log('Filling started.');

        var afterInsertion = function() {
            console.log('Filling done =).');
            callback(false);
        };

        var file = __tmpbase + 'events.json';
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
                    console.log('Events from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        Event.remove({}, function(err) {
            console.log('Events collection removed');
            callback();
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

        var addEvent = function(event, callb) {
            Events.add(event, function (success, data) {

                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (events) {
            // iterate through events
            async.forEach(events, function (event, _callback) {
                    // name is required
                    if (!event.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    event = module.exports.matchToModel(event);

                    if(module.exports.policy == 1) { // empty db, so just add it
                        addEvent(event, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Events.getByName(event.name,function(success,oldEvent){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in event) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (module.exports.policy == 2 || oldEvent[z] === undefined)) {
                                        if(oldEvent[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldEvent[z] = event[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(event.name + " is updated.");
                                    oldEvent.updatedAt = new Date();
                                    oldEvent.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(event.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addEvent(event, function(suc){_callback();});
                            }
                        });

                    }
                },
                function (err) { callback(true); }
            );
        };

        // delete the collection before the insertion?
        if(module.exports.policy == 1) {
            console.log("Delete and refill policy. Deleting collection..");
            module.exports.clearAll(function() {insert(events);});
        }
        else {
            insert(events);
        }
    }
};