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
    getHouseByName: function(name, callback) {
        var House = require(this.model);
        House.findOne({'name':name}, function(err,obj)
        {
            if (err)
                callback(2,err);
            else if(obj == null)
                callback(3,'No house with name "'+ name +'" in the database.');
            else
                callback(1, obj);
        });
    },
    getHouseById: function(id, callback) {
        var House = require(this.model);
        House.findOne({'_id': id}, function(err,obj)
        {
            if (err)
                callback(2,err);
            else if(obj == null)
                callback(3,'No house with id "'+ id +'" in the database.');
            else
                callback(1, obj);
        });
    },

    removeHouse: function (id, callback) {
        var House = require(this.model);
        House.remove({
            _id: id
        }, function(err, house) {
            if (err)
                callback(false);
            else
                callback(true);
        });

    },

    editHouse: function (id, data, callback) {
        this.getHouseById(id,function(success, house) {
            // house exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        house[key] = data[key];
                    }
                }
                house.save(function(err) {
                    if (err){
                        callback(false,err);
                    }
                    else {
                        callback(true,house);
                    }
                });
            }
            // house is not existing
            else if (success == 3) {
                callback(false, 'Failure. No house with id "'+id +'" existing!')
            }
            else {
                callback(false, house);
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
    },

    removeHouseType: function (id, callback) {
        var House = require(this.houseTypeModel);
        House.remove({
            _id: id
        }, function(err, house) {
            if (err)
                callback(false);
            else
                callback(true);
        });

    }
};