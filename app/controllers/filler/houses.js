var Scraper = require(__appbase + 'controllers/scraper/houses');
var House = require(__appbase + 'models/house');
var Houses = require(__appbase + 'stores/houses');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function() {
            console.log('Filling done =).');
            res.sendStatus(200);
            return;
        };

        var file = __appbase + '../wikiData/houses.json';
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
                    console.log('Houses from cache file "'+file+'". Not scrapped from wiki.');
                    module.exports.insertToDb(obj.data,afterInsertion);
                }
            } else {
                scrape();
            }
        });
    },
    clearAll: function(callback) {
        House.remove({}, function(err) {
            console.log('collection removed');
            callback();
        });
    },
    matchToModel: function(house) {
        // go through the properties of the house
        for(var z in house) {
            if(z == 'died out') {
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
                    delete house[z]; // ignore it for now
                }
            }
        }

        return house;
    },
    insertToDb: function(houses, callback) {
        console.log('Inserting into db..');

        var addHouse = function(house, callb) {
            Houses.add(house, function (success, data) {
                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };
        
        var downloadImage = function(house, callb) {
            var fs = require('fs'),
                request = require('request');
            var uri = 'http://awoiaf.westeros.org/' + house.imageLink;
            var filename = '/misc/images/houses/' + house.name.replace(new RegExp(" ", "g"),"_");
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
        
        var insert = function (house,_callback) {
            house = module.exports.matchToModel(house);

            if(cfg.fillerPolicy == 1) { // empty db, so just add it
                addHouse(house, function(suc){ _callback(); });
            }
            else {
                // see if there is such an entry already in the db
                Houses.getByName(house.name,function(success,oldHouse){
                    if(success == 1) { // old entry is existing
                        var isChange = false;
                        // iterate through properties
                        for(var z in house) {
                            // only change if update policy or property is not yet stored
                            if(z != "_id" && (cfg.fillerPolicy == 2 || oldHouse[z] === undefined)) {
                                if(oldHouse[z] === undefined) {
                                    console.log("To old entry the new property "+z+" is added.");
                                }
                                oldHouse[z] = house[z];
                                isChange = true;
                            }
                        }
                        if(isChange) {
                            console.log(house.name + " is updated.");
                            oldHouse.updatedAt = new Date();
                            oldHouse.save(function(err){
                                _callback();
                            });
                        }
                        else {
                            console.log(house.name + " is untouched.");
                            _callback();
                        }
                    }
                    else { // not existing, so it is added in every policy
                        addHouse(house, function(suc){_callback();});
                    }
                });

            }
        };
        
        var insertAll = function (houses) {
            // iterate through houses
            async.forEach(houses, function (house, _callback) {
                // name is required
                if (!house.hasOwnProperty('name')) {
                    _callback();
                    return;
                }

                if(house.imageLink !== undefined){
                    downloadImage(house, function(err, newImageLink){
                        if(!err) {
                            house.imageLink = newImageLink;
                        }
                        insert(house,_callback);
                    });
                }
                else {
                    insert(house,_callback);
                }
            },
            function (err) { callback(true); }
            );
        };

        // delete the collection before the insertion?
        if(cfg.fillerPolicy == 1) {
            console.log("Delete and refill policy. Deleting collection..");
            module.exports.clearAll(function() {
                insertAll(houses);
            });
        }
        else {
            insertAll(houses);
        }
    }
};