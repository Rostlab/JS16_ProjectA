module.exports = {
    model: '../models/house',
    addHouse: function (data) {
        var House = require(this.model);
        var house = new House();
        house.name = data.name;
        /**
         * TODO: Glue code to the model still needed here, but model still not defined.
         */

        house.save(function(err) {
            if (err){
                console.log(err);
                return false;
            }
            else {
                console.log('Well, true is to return.');
                return true; // why undefined?
            }
        });
    },

    getHouses: function () {
        var House = require(this.model);
        House.find(function (err, houses) {
            if (err){
                console.log(err);
                return false;
            }
            else {
                return houses;
            }
        });
    }
};