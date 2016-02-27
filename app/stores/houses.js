module.exports = {
    model: '../models/house',
    houseTypeModel: '../models/houseType',
    addHouse: function (data, callback) {
        var House = require(this.model);
        var house = new House();

        // filter by house schema
        House.schema.eachPath(function(path) {
            if (path == '_id' || path == '__v')
                return;

            // add field data to new house document
            if (data.hasOwnProperty(path)) {
                house[path] = data[path];
            }
        });

        house.save(function(err) {
            if (err){
                callback(false,err);
            }
            else {
                callback(true,house);
            }
        });
    },
    addHouseType: function(name,callback) {
        var HouseType = require(this.houseTypeModel);
        var entry = new HouseType();
        entry.name = name;
        entry.save(function(err) {
            if (err){
                callback(false,err);
            }
            else {
                callback(true,entry);
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
    },
    getHouseTypes: function (callback) {
        var HouseType = require(this.houseTypeModel);
        HouseType.find(function (err, types) {
            if (err){
                callback(err);
            }
            else {
                callback(types);
            }
        });
    }
};