(function () {
    "use strict";
    var age = require(__appbase + 'models/age');
    var character = require(__appbase + 'models/character');
    var cities = require(__appbase + 'models/cities');
    var continent = require(__appbase + 'models/continent');
    var culture = require(__appbase + 'models/culture');
    var episode = require(__appbase + 'models/episode');
    var event = require(__appbase + 'models/event');
    var house = require(__appbase + 'models/house');
    var region = require(__appbase + 'models/region');


    var getCounts = function (promises, counts) {
        promises.push(new Promise(function (resolve, reject) {
            age.count({}, function (err, c) {
                counts.ages = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            character.count({}, function (err, c) {
                counts.characters = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            cities.count({}, function (err, c) {
                counts.cities = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            continent.count({}, function (err, c) {
                counts.continents = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            culture.count({}, function (err, c) {
                counts.cultures = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            episode.count({}, function (err, c) {
                counts.episodes = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            event.count({}, function (err, c) {
                counts.events = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            house.count({}, function (err, c) {
                counts.houses = c;
                resolve();
            });
        }));
        promises.push(new Promise(function (resolve, reject) {
            region.count({}, function (err, c) {
                counts.regions = c;
                resolve();
            });
        }));
    };

    var getCharacterStats = function (promises, counts) {
        //Popular houses
        promises.push(new Promise(function (resolve, reject) {
            let agg = [
                {
                    $group: {
                        _id: "$house",
                        total: {$sum: 1}
                    }
                },
                {$sort: {"total": -1}}
            ];
            character.aggregate(agg, function (err, c) {
                counts.popularHouses = c;
                resolve();
            });
        }));

        //Popular titles
        promises.push(new Promise(function (resolve, reject) {
            let agg = [
                {
                    $group: {
                        _id: "$title",
                        total: {$sum: 1}
                    }
                },
                {$sort: {"total": -1}}
            ];
            character.aggregate(agg, function (err, c) {
                counts.popularTitles = c;
                resolve();
            });
        }));

        //Dead vs alive
        promises.push(new Promise(function (resolve, reject) {
            let agg = [
                {
                    $group: {
                        _id: "result",
                        alive: {$sum: {$cond: [{$gt: ["$dateOfDeath", null]}, 1, 0]}},
                        dead: {$sum: {$cond: [{$gt: ["$dateOfDeath", null]}, 0, 1]}}
                    }
                }
            ];
            character.aggregate(agg, function (err, c) {
                if (err) {
                    reject(err);
                }
                counts.deadVsAlive = c;
                resolve();
            });
        }));

        //male vs female
        promises.push(new Promise(function (resolve, reject) {
            let agg = [
                {
                    $group: {
                        _id: "result",
                        male: {$sum: {$cond: [{$eq: ["$male", true]}, 1, 0]}},
                        female: {$sum: {$cond: [{$eq: ["$male", false]}, 1, 0]}}
                    }
                }
            ];
            character.aggregate(agg, function (err, c) {
                if (err) {
                    reject(err);
                }
                counts.maleVsFemale = c;
                resolve();
            });
        }));
    };

    module.exports = {
        getStats: function (req, res) {

            var response = {counts: {}, character: {}};
            var promises = [];

            getCounts(promises, response.counts);
            getCharacterStats(promises, response.character);

            //Send the data once all the queries finished
            Promise.all(promises).then(function () {
                res.status(200).json(response);
            }).catch(console.error);
        }
    };
}());