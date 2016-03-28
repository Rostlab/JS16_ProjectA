(function () {
    "use strict";
    var House = require(__appbase + "models/house");
    var bot = require("nodemw");
    var client = new bot({
        server: "awoiaf.westeros.org",
        path: "/api.php",
        concurrency: "5"
    });
    var jsonfile = require('jsonfile');

    var HtmlParser = require('cheerio');

    module.exports = {
        /*
         * Returns a list of house names
         */
        getAllNames: function (callback) {

            //Setup the mediawiki bot
            var houses = [];

            //Iterate through all the houses
            console.log("Loading all houses from the wiki. This might take a while");

            var apiCallback = function (err, info, next, data) {
                if (data) {
                    for (let j = 0; j < data.query.search.length; j++) {
                        //console.log(info);
                        var title = String(data.query.search[j].title);
                        if (title === null) {
                            break;
                        }

                        console.log("House " + title);

                        houses.push(title);
                    }
                    if (houses.length == data.query.searchinfo.totalhits) {
                        callback(houses);
                    }
                }
            };

            for (let i = 0; i < 540; i = i + 10) {
                //Setup up the api parameters
                var params = {
                    action: "query",
                    titles: "Houses%20Of%20Westeros",
                    list: "search",
                    srsearch: "house",
                    format: "json",
                    sroffset: String(i)
                };

                //Get results from api
                client.api.call(params, apiCallback);
            }
        },
        /*
         * Call when you want to fetch all house information
         */
        getAll: function (callback) {

            module.exports.getAllNames(function(houses) {
                 var housesCollection = [];
                var saveHouse = function (house) {
                    housesCollection.push(house);
                    if (housesCollection.length == houses.length) {
                        callback(housesCollection);
                    }
                };
                for (let i = 0; i < houses.length; i++) {
                    console.log();
                    console.log((i+1) + " of " + houses.length + " houses scraped.");
                    module.exports.get(houses[i], saveHouse);
                }
            });

        },

        /*
         * Fetches details for one house
         */
        get: function (houseName, callback) {

            console.log("Scraping: " + houseName);
            var pageName = houseName.replace(/\s/g, "_");

            var params = {
                action: "parse",
                page: pageName,
                format: "json"
            };

            var house = {};

            client.api.call(params, function (err, info, next, data) {
                if (data) {

                    var $ = HtmlParser.load(data.parse.text["*"]);
                    var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);
                    if (arr !== null) {
                        house.name = houseName;

                        for (let i = 0; i < arr.length; i++) {
                            var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
                            var name = tempName[0].substring(1, tempName[0].length - 1);
                            var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);
                            var value = tempValue[0].substring(1, tempValue[0].length - 1);
                            if (value.indexOf("href") != -1) {
                                value = value.match(/\">(.*?)<\/a>/)[0];
                                value = value.substring(2, value.length - 4);
                            }
                            else {
                                value = value.substring(1, value.length - 4);
                            }
                            /*
                             * Get the other information
                             */

                            if (value !== null) {
                                name = name.toLowerCase();
                                if (name == "coat of arms") {
                                    name = "coatOfArms";
                                }
                                else if (name == "current lord") {
                                    name = "currentLord";
                                }
                                else if (name == "cadet branch") {
                                    name = "cadetBranch";
                                }
                                else if (name == "ancestral weapon") {
                                    name = "ancestralWeapon";
                                }
                                house[name] = value;
                            }

                            /*
                             *
                             */
                        }
                    }
                    //fetch the image
                    var imgLink = $('.infobox-image img').attr('src');
                    if(imgLink !== undefined) {
                        house.imageLink = imgLink;
                    }
                }
                callback(house);
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