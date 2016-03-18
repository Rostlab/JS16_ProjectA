(function () {
    "use strict";
    var agesScraper = require("./ages");
    var jsonfile = require('jsonfile');

    module.exports = {
        getAll: function (callback) {

            var events = [];
            agesScraper.getAllWithEvents(function (ages) {
                for (let i = 0; i < ages.length; i++) {
                    for (let j = 0; j < ages[i].events.length; j++) {
                        var event = ages[i].events[j];
                        event.age = ages[i].name;
                        events.push(event);
                    }
                }
                callback(events);
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