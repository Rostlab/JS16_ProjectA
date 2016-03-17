var City = require(__appbase + 'models/city');
var Cities = require(__appbase + 'stores/cities');
var jsonfile = require('jsonfile');
var async = require('async');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var file = __appbase + '../wikiData/cities.json';

        jsonfile.readFile(file, function(err, obj) {
            if(err) {
                console.log('Error: ' + err);
                return;
            }
            console.log('Cities from  file "'+file+'". No scrapping.');
            module.exports.insertToDb(obj,function() {
                console.log('Filling done =).');
            });
        });
    },
    clearAll: function(req,res) {
        City.remove({}, function(err) {
            console.log('collection removed');
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
        console.log(cities);
        console.log('Inserting into db..');

        // iterate through cities
        async.forEach(cities, function (city, _callback) {
            // name is required
            if (!city.hasOwnProperty('name')) {
                _callback();
                return;
            }

            city = module.exports.matchToModel(city);
            // add city to db
            Cities.add(city, function (success, data) {
                if (success != 1) {
                    console.log('Problem:' + data);
                }
                else {
                    console.log('SUCCESS: ' + data.name);
                }
                _callback();
            });
        }, function (err) {
            callback(true);
        });
    }
};