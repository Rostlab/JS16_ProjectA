var City = require(__appbase + 'models/city');

module.exports = {

    add: function (data, callback) {
        var cities = new City();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !City.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                cities[key] = data[key];
            }
        }

        cities.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,cities);
            }
        });
    },

    get: function(data, callback) {
        for (var key in data) {

            // check if POST data matches Schema
            if (data.hasOwnProperty(key) && !City.schema.paths.hasOwnProperty(key)) {
                callback(2, key);
                return;
            }

            // priority range queries:
            // Find x < c
            if (key == 'priority') {
                var sub = data[key].substring(0,2);
                if (sub == '>=') {
                    data[key] = {$gte: data[key].substring(2)};
                }
                else if (sub == '<=') {
                    data[key] = {$lte: data[key].substring(2)};
                }
                else if (data[key].indexOf('>') > -1) {
                    data[key] = {$gt: data[key].replace('>', '')};
                }
                else if (data[key].indexOf('<') > -1) {
                    data[key] = {$lt: data[key].replace('<', '')};
                }
            }
        }

        City.find(data, function(err,obj)
        {
            if(obj.length === 0)
                callback(3,data);
            else
                callback(1, obj);
        });
    },

    getByName: function(name, callback) {
        this.get({'name':name},function(success,message){
            if(success == 1) {
                callback(success,message[0]);
            }
            else {
                callback(success,message);
            }
        });
    },

    getById: function(id, callback) {
        this.get({'_id': id},function(success,message){
            if(success == 1) {
                callback(success,message[0]);
            }
            else {
                callback(success,message);
            }
        });
    },

    getAll: function (callback) {
        City.find(function (err, citiess) {
            if (err)
                callback(false,err);
            else
                callback(true,citiess);
        });
    },

    remove: function (id, callback) {
        City.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !City.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, cities) {
            // Cities exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        City[key] = data[key];
                    }
                }
                City.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,City);
                    }
                });
            }
            // Cities is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, cities);
            }
        });
    },
};
