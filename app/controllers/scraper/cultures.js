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
        getAll: function (callback) {
            console.log("start getAll");

            var params = {
                action: "parse",
                page: "Portal:Culture",
                format: "json"
            };

            client.api.call(params, function (err, info, next, data) {

                var allData = data.parse.text["*"];
                var result = allData.match(/<tr>(.|\n)*?<\/tr>/g);
                var listForSevenKingdoms, listForBeyondTheWall, listForEssos, listForAncientTimes;
                var cultures = [];

                for (let i = 0; i < result.length; i++) {
                    if (result[i].match(/(Seven Kingdoms)/)) {
                        listForSevenKingdoms = result[i].match(/title="([^"]*)"/g);
                        listForSevenKingdoms.shift();
                        for (let j = 0; j < listForSevenKingdoms.length; j++) {
                            let culture = {};
                            culture.name = listForSevenKingdoms[j].substring(7, listForSevenKingdoms[j].length - 1);
                            cultures.push(culture);
                        }
                    }
                    /*
                     if(result[i].match(/(Beyond the Wall)/)){
                     listForBeyondTheWall = result[i].match(/title="([^"]*)"/g);
                     for(j=0; j<listForBeyondTheWall.length; j++){
                     var culture = {};
                     culture.name = listForBeyondTheWall[j].substring(7, listForBeyondTheWall[j].length-1);
                     cultures.push(culture);
                     }
                     }
                     */
                    if (result[i].match(/Essos/)) {
                        listForEssos = result[i].match(/title="([^"]*)"/g);
                        listForEssos.shift();
                        for (let j = 0; j < listForEssos.length; j++) {
                            let culture = {};
                            culture.name = listForEssos[j].substring(7, listForEssos[j].length - 1);
                            cultures.push(culture);
                        }
                    }
                    /*
                     if(result[i].match(/(From ancient times)/)){
                     listForAncientTimes = result[i].match(/title="([^"]*)"/g);
                     for(j=0; j<listForAncientTimes.length; j++){
                     var culture = {};
                     culture.name = listForAncientTimes[j].substring(7, listForAncientTimes[j].length-1);
                     cultures.push(culture);
                     }
                     }
                     */
                }
                callback(cultures);
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