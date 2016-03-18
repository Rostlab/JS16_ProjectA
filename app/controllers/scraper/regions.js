(function () {
    "use strict";
    var bot = require("nodemw");
    var client = new bot({
        server: "awoiaf.westeros.org",
        path: "/api.php",
        concurrency: "5"
    });
    var jsonfile = require('jsonfile');

    module.exports = {
        get: function (regionName, callback) {
            var scraper = require("./regions");
            scraper.getAll(function (regions) {
                for (let i = 0; i < regions.length; i++) {
                    if (regions[i].name == regionName) {
                        callback(regions[i]);
                    }
                }
            });
        },

        getAll: function (callback) {
            console.log("start getRegions");
            //Setup the mediawiki bot

            var params = {
                action: "parse",
                page: "Portal:Geography",
                format: "json"
            };

            var regions = [];

            //Iterate through all Regions

            //console.log("Loading all regions from the wiki. This might take a while");
            client.api.call(params, function (err, info, next, data) {

                var section = data.parse.text["*"].split("Regions");
                for (let i = 1; i < 4; i++) {
                    var continents = section[i].split("<\/li><\/ul>");

                    var str = continents[0].match(/\">(.*?)<\/a>/g);
                    for (let j = 0; j < str.length; j++) {
                        str[j] = str[j].substring(2, str[j].length - 4);
                        var region = {};
                        region.name = str[j];
                        regions.push(region);
                    }
                }
                callback(regions);

            });
        },
        scrapToFile: function (cacheFile, scraperFunction, callback) {
            console.log('Scrapping from wiki. May take a while..');
            scraperFunction(function (data) {
                data = {'data': data, createdAt: new Date()};
                console.log('Writing results into cache file "' + cacheFile + '"..');
                jsonfile.writeFile(cacheFile, data, function (err) {
                    callback(err, data);
                });
            });
        }
    };
}());