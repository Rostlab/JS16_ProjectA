var Scraper = require(__appbase + 'controllers/scraper');
var Continent = require(__appbase + 'models/continent');
var Continents = require(__appbase + 'stores/continents');
var jsonfile = require('jsonfile');
var async = require('async');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function()
        {
            console.log('Filling done =).');
        };

        console.log('The 3 existing continents are hardcoded. Not scrapped from wiki.');
        continents = [
            {
                name: "Essos",
                cardinalDirection: "east",
                neighbors: ["Westeros","Sothoryos"]
            },
            {
                name: "Sothoryos",
                cardinalDirection: "south",
                neighbors: ["Essos","Westeros"]
            },
            {
                name: "Westeros",
                cardinalDirection: "west",
                neighbors: ["Essos","Sothoryos"]
            }

        ];


        var filler = require(__appbase + 'controllers/filler/continents');
        filler.insertToDb(continents,afterInsertion);

    },
    clearAll: function(req,res) {
        Continent.remove({}, function(err) {
            console.log('Continents collection removed');
        });
    },
    insertToDb: function(continents, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through houses
        async.forEach(continents, function (continent, _callback) {
                // name is required
                if (!continent.hasOwnProperty('name')) {
                    _callback();
                    return;
                }

                // add house to db
                Continents.add(continent, function (success, data) {
                    if (success != 1) {
                        console.log('Problem:' + data);
                    }
                    else {
                        console.log('SUCCESS: ' + data.name);
                    }
                    _callback();
                });
            },
            function (err) {
                callback(true);
            });
    }
};