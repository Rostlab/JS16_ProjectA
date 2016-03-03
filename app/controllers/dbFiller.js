var Scraper = require(__appbase + 'controllers/scraper');
var House = require(__appbase + 'models/house');
var Houses = require(__appbase + 'stores/houses');

module.exports = {
    fillHouses: function(req, res) {
        console.log('Filling started. This may take a while.');

        Scraper.getHouses(function(houses) {
            var i = 0;

            var callbackDebug =  function(success,data) {
                if(success != 1)
                {
                    console.log('Problem:' + data);
                }
                else
                {
                    console.log('SUCCESS: ' + data.name);

                }

            };

            // go through houses
            for(var k in houses) {
                if(!houses[k].hasOwnProperty('name'))
                    continue;

                // go through the properties of the house
                for(var z in houses[k]) {
                    // ignore references for now, later gather the ids and edit the entries
                    if (z == 'overlord' || z == 'region' || z == 'type' || z == 'currentLord' || !House.schema.paths.hasOwnProperty(z)) {
                        delete houses[k][z];
                    }

                    // remove spaces and html tags
                    if (typeof houses[k][z] == 'string') {
                        houses[k][z] = houses[k][z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                    }

                    // translate founded to a number
                    if (z == 'founded') {
                        if (houses[k][z].indexOf('AC') > -1 || houses[k][z].indexOf('ac') > -1) {
                            houses[k][z] = Math.abs(houses[k][z].replace(/\D/g, ''));
                        }
                        else if (houses[k][z].indexOf('BC') > -1 || houses[k][z].indexOf('bc') > -1) {
                            houses[k][z] = 0 - Math.abs(houses[k][z].replace(/\D/g, ''));
                        }
                        else {
                            // TODO: it is the name of an age, which has to be transformed into a date

                            delete houses[k][z]; // ignore it for now
                        }
                    }
                }

                Houses.add(houses[k], callbackDebug);

            }
        });
    },
    clearHouses: function(req,res) {
        House.remove({}, function(err) {
            console.log('collection removed');
        });
    },
    addHousesReferences: function(req,res) {
        // TODO: Still every db entry has to be edited and the references updated
    }
};