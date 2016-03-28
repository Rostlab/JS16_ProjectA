(function () {
    "use strict";
    var bot = require("nodemw");
    var client = new bot({
        server: "awoiaf.westeros.org",
        path: "/api.php",
        concurrency: "5"
    });
    var jsonfile = require('jsonfile');
    var Async = require('async');
    var charactersScraper = require("./characters");
    var City = require(__appbase + "models/city");

    module.exports = {
        getAll: function (callback) {
            City.find(function(err,cities) {
                if(err) {
                    console.log('No cities yet. Thus, no character locations.');
                    callback(true);
                }

                var cityNames = [];
                Async.each(cities,function(city,_callback){
                    if(city.name !== undefined && city.name.length > 0) {
                        cityNames.push(city.name);
                    }
                    _callback();
                }, function(err){
                    if(err) {
                        console.log('ERROR: '+err);
                        callback(true);
                    }
                    // after for each
                    charactersScraper.getAllNames(function (characterNames) {
                        var characterLocations = [];

                        Async.each(characterNames,function(characterName,_callback){
                            module.exports.get(characterName, cityNames, function(charactersLocations){
                                characterLocations.push(charactersLocations);
                                console.log("Still " + (characterNames.length - characterLocations.length) + " character wiki pages to fetch.");
                                _callback();
                            });
                        }, function(err) {
                            if(err) {
                                console.log(err);
                                return;
                            }
                            callback(false, characterLocations);
                        });
                    });
                });

            });
        },
        /*
         * Fetches details for one character
         */
        get: function (characterName, locationNames, callback) {
            if(!characterName){
                console.log("Skipped: "+characterName);
                return ;
            }

            console.log("Fetching " + characterName);

            var pageName = characterName.replace(/\s/g, "_");

            var params = {
                action: "parse",
                page: pageName,
                format: "json",
				redirects: ""
            };

            var character = {};
            client.api.call(params, function (err, info, next, data) {
                if (data) {
                    var body = data.parse.text["*"];
                    var locationHits = [];

                    // go through location names
                    Async.each(locationNames,function(locationName,_callback) {
                        // is location mentioned in wiki body?
                        if(body.indexOf(locationName) > -1) {
                            locationHits.push(locationName);
                        }
                        _callback();
                    }, function(err) {
                        if(err) {
                            console.log('ERROR: ' + err);
                            callback(character);
                        }

                        character.name = characterName;
                        character.slug = pageName;
                        character.locations = locationHits;

                        console.log("Fetched " + character.name);
                        console.log("Locations " + character.locations);
                        callback(character);
                    });
                }
                else {
                    callback(character);
                }
            });
        },
        scrapToFile: function (cacheFile, scraperFunction, callback) {
            console.log('Scrapping from wiki. May take a while..');
            scraperFunction(function (err,data) {
                if(err) {
                    console.log(err);
                }
                else {
                    data = {'data': data, createdAt: new Date()};
                    console.log('Writing results into cache file "' + cacheFile + '"..');
                    jsonfile.writeFile(cacheFile, data,{'spaces':2}, function (err) {
                        callback(err, data);
                    });
                }
            });
        }
    };
}());