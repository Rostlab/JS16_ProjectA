module.exports = {
    model: '../models/house',
    houseTypeModel: '../models/houseType',
    add: function (data, callback) {
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
    get: function(data, callback) {
        var House = require(this.model);

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !House.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        House.findOne(data, function(err,obj)
        {
            if(obj == null)
                callback(3,data);
            else
                callback(1, obj);
        });
    },
    getByName: function(name, callback) {
        this.get({'name':name},callback);
    },
    getById: function(id, callback) {
        this.get({'_id': id},callback);
    },
    getAll: function (callback) {
        var House = require(this.model);
        House.find(function (err, houses) {
            if (err)
                callback(false,err);
            else
                callback(true,houses);
        });
    },
    remove: function (id, callback) {
        var House = require(this.model);
        House.remove({_id: id}, function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    },

    edit: function (id, data, callback) {
        var House = require(this.model);

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !House.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, house) {
            // house exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        house[key] = data[key];
                    }
                }
                house.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,house);
                    }
                });
            }
            // house is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, house);
            }
        });
    },

    addType: function(name,callback) {
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
    getAllTypes: function (callback) {
        var HouseType = require(this.houseTypeModel);
        HouseType.find(function (err, types) {
            if (err)
                callback(false,err);
            else
                callback(true,types);
        });
    },

    removeType: function (id, callback) {
        var House = require(this.houseTypeModel);
        House.remove({_id: id},function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    }
};