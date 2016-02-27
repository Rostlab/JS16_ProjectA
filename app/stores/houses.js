module.exports = {
    model: '../models/house',
    addHouse: function (data, callback) {
        var House = require(this.model);
        var house = new House();
        house.name = data.name;
        /**
         * TODO: Glue code to the model still needed here, but model still not defined.
         */

        house.save(function(err) {
            if (err){
                callback(err);
            }
            else {
                callback(true);
            }
        });
    },

    getHouses: function (callback) {
        var House = require(this.model);
        House.find(function (err, houses) {
            if (err){
                callback(err);
            }
            else {
                callback(houses);
            }
        });
    }
};