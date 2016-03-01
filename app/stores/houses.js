var House = require(__appbase + 'models/house');
var HouseType = require(__appbase + 'models/houseType');

module.exports = {

    add: function (data, callback) {
        var house = new House();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !House.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
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
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !House.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        House.find(data, function(err,obj)
        {
            if(obj.length === 0)
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
        House.find(function (err, houses) {
            if (err)
                callback(false,err);
            else
                callback(true,houses);
        });
    },

    remove: function (id, callback) {
        House.remove({_id: id}, function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    },

    edit: function (id, data, callback) {
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

    addType: function(data,callback) {
        var entry = new HouseType();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !HouseType.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                entry[key] = data[key];
            }
        }

        entry.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,entry);
            }
        });
    },
    getAllTypes: function (callback) {
        HouseType.find(function (err, types) {
            if (err)
                callback(false,err);
            else
                callback(true,types);
        });
    },

    removeType: function (id, callback) {
        HouseType.remove({_id: id},function(err, resp) {
            console.log(id);
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });
    }
};