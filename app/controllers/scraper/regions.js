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
			
			if(!regionName){
                console.log("Skipped: "+regionName);
                return ;
            }

            console.log("Fetching " + regionName);

            var pageName = regionName.replace(/\s/g, "_");
			
            var scraper = require("./regions");
            var params = {
                action: "parse",
                page: pageName,
                format: "json",
				redirects: ""
            };
			
			var region = {};
			
			client.api.call(params, function (err, info, next, data) {
                if(data !== null && data !== undefined) {
					if(data.parse.redirects.length > 0) {
						regionName = data.parse.redirects[0].to;
					}
				}
				
				region.name = regionName;
				
                callback(region);

            });
			
        },

        getAllNames: function (callback) {
            console.log("start getRegions");
            //Setup the mediawiki bot

            var params = {
                action: "parse",
                page: "Portal:Geography",
                format: "json",
				redirects: ""
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
                        //var region = {};
                        //region.name = str[j];
                        regions.push(str[j]);
                    }
                }
                callback(regions);

            });
        },
		
		getAll: function (callback) {
            var scraper = require("./regions");
            scraper.getAllNames(function (regions) {

                var regionsCollection = [];
                var saveReg = function (region) {
                    regionsCollection.push(region);
                    console.log("Still " + (regions.length - regionsCollection.length) + " regions to fetch.");
                    if (regionsCollection.length == regions.length) {
                        callback(regionsCollection);
                    }
                };

                for (let i = 0; i < regions.length; i++) {
                    scraper.get(regions[i], saveReg);
                }
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