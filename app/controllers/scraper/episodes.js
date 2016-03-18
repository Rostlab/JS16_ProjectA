(function () {
    "use strict";
    var bot = require("nodemw");
    var client = new bot({
        server: "awoiaf.westeros.org",
        path: "/api.php",
        concurrency: "5"
    });

    var params = {
        action: "parse",
        page: "Portal:TV_Show",
        format: "json"
    };
    var jsonfile = require('jsonfile');

    module.exports = {
        getAllNames: function (callback) {
            var episodes = [];

            //Iterate through all the episodes

            console.log("Loading all episodes from the wiki. This might take a while");
            client.api.call(params, function (err, info, next, data) {
                let arr = data.parse.text["*"].match(/<li>(.*?)<\/li>/g);
                for (let i = 0; i < arr.length; i++) {
                    let subArr = arr[i].match(/\stitle=\"(.*?)\"/g);
                    episodes.push(subArr[0].substring(8, subArr[0].length - 1));
                }
                callback(episodes);
            });
        },

        getAll: function (callback) {
            var scraper = require("./episodes");
            scraper.getAllNames(function (episodes) {
                var episodesCollection = [];
                var nr = episodes.length;
                var saveEpisode = function (episode) {
                    if (episode.name !== null) {
                        episodesCollection.push(episode);
                        console.log("Fetched " + episode.name);
                    }
                    else {
                        nr--;
                    }
                    if (episodesCollection.length == nr) {
                        console.log("Fetched " + episodesCollection.length + " episodes");
                        callback(episodesCollection);
                    }
                };

                console.log(episodes.length + " episodes to fetch");
                for (let i = 0; i < episodes.length; i++) {
                    scraper.get(episodes[i], saveEpisode);
                }
            });
        },

        get: function (episodeName, callback) {
            //console.log("start get epsiode: " + episodeName);

            if (episodeName == "Baelor" || episodeName == "Mhysa") {
                episodeName = episodeName + " (TV)";
            }
            if (episodeName == "Nightlands (TV)") {
                episodeName = "The Night Lands (TV)";
            }


            var pageName = episodeName.replace(/\s/g, "_");


            var params = {
                action: "parse",
                page: pageName,
                format: "json"
            };

            var episode = {};
            client.api.call(params, function (err, info, next, data) {
                if (data) {
                    var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);
                    if (arr) {
                        episode.name = episodeName;
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
                                if (name == "airdate") {
                                    name = "airDate";
                                }
                                else if (name == "episode #") {

                                    var tmp = arr[i].match(/Episode\s\#(.*?)<\/tr>/g)[0].match(/>(.*?)</g);
                                    var seasonNumber = tmp[2].substring(1, tmp[2].length - 1);
                                    var episodeNumber = tmp[3].substring(11, tmp[3].length - 1);
                                    episode.nr = episodeNumber;
                                    episode.season = seasonNumber;
                                    episode.totalNr = parseInt(episodeNumber) + (parseInt(seasonNumber) - 1) * 10;
                                    continue;

                                }

                                episode[name] = value;
                            }

                            /*
                             *
                             */
                        }
                    }
                    var arrRelationships = data.parse.text["*"].match(/<td>\"<a\shref(.*?)>(.*?)<\/a>\"<\/td>/g);
                    if (arrRelationships !== null) {
                        var predecessor = arrRelationships[0].match(/\">(.*?)<\/a>"/g)[0];
                        predecessor = predecessor.substring(2, predecessor.length - 4);
                        var successor = arrRelationships[1].match(/\">(.*?)<\/a>"/g)[0];
                        predecessor = successor.substring(2, successor.length - 4);
                    }
                }

                callback(episode);
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