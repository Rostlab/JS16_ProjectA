var City = require(__appbase + 'models/city');
var Cities = require(__appbase + 'stores/cities');
var jsonfile = require('jsonfile');
var async = require('async');
var cfg = require(__appbase + '../cfg/config.json');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var file = __appbase + '../data/cities.json';

        jsonfile.readFile(file, function(err, obj) {
            if(err) {
                console.log('Error: ' + err);
                return;
            }
            console.log('Cities from  file "'+file+'". No scrapping.');
            module.exports.insertToDb(obj,function() {
                console.log('Filling done =).');
                res.sendStatus(200);
                return;
            });
        });
    },
    clearAll: function(callback) {
        City.remove({}, function(err) {
            console.log('collection removed');
            callback();
        });
    },
    matchToModel: function(city) {
        // go through the properties of the city
        for(var z in city) {
            if (!City.schema.paths.hasOwnProperty(z) || z == '_id') {
                delete city[z];
            }

            // remove spaces and html tags
            if (typeof city[z] == 'string') {
                city[z] = city[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return city;
    },
    insertToDb: function(cities, callback) {
        console.log('Inserting into db..');

        var addCity = function(city, callb) {
            Cities.add(city, function (success, data) {
                console.log((success != 1) ? 'Problem:' + data : 'SUCCESS: ' + data.name);
                callb(true);
            });
        };

        var insert = function (cities) {
            // iterate through cities
            async.forEach(cities, function (city, _callback) {
                    // name is required
                    if (!city.hasOwnProperty('name')) {
                        _callback();
                        return;
                    }

                    city = module.exports.matchToModel(city);

                    if(cfg.fillerPolicy == 1) { // empty db, so just add it
                        addCity(city, function(suc){ _callback(); });
                    }
                    else {
                        // see if there is such an entry already in the db
                        Cities.getByName(city.name,function(success,oldCity){
                            if(success == 1) { // old entry is existing
                                var isChange = false;
                                // iterate through properties
                                for(var z in city) {
                                    // only change if update policy or property is not yet stored
                                    if(z != "_id" && (cfg.fillerPolicy == 2 || oldCity[z] === undefined)) {
                                        if(oldCity[z] === undefined) {
                                            console.log("To old entry the new property "+z+" is added.");
                                        }
                                        oldCity[z] = city[z];
                                        isChange = true;
                                    }
                                }
                                if(isChange) {
                                    console.log(city.name + " is updated.");
                                    oldCity.updatedAt = new Date();
                                    oldCity.save(function(err){
                                        _callback();
                                    });
                                }
                                else {
                                    console.log(city.name + " is untouched.");
                                    _callback();
                                }
                            }
                            else { // not existing, so it is added in every policy
                                addCity(city, function(suc){_callback();});
                            }
                        });

                    }
                },
                function (err) { callback(true); }
            );
        };

        // delete the collection before the insertion?
        if(cfg.fillerPolicy == 1) {
            console.log("Delete and refill policy. Deleting collection..");
            module.exports.clearAll(function() {insert(cities);});
        }
        else {
            insert(cities);
        }
    }
};