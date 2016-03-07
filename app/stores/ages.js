var Age = require(__appbase + 'models/age');

module.exports = {

    add: function (data, callback) {
        var age = new Age();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Age.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                age[key] = data[key];
            }
        }

        age.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,age);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Age.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }

            var rangeQuery = function(key,callback) {
                var sub = data[key].substring(0,2);
                if (sub == '>=') {
                    callback({$gte: data[key].substring(2)});
                }
                else if (sub == '<=') {
                    callback({$lte: data[key].substring(2)});
                }
                else if (data[key].indexOf('>') > -1) {
                    callback({$gt: data[key].replace('>', '')});
                }
                else if (data[key].indexOf('<') > -1) {
                    callback({$lt: data[key].replace('<', '')});
                }

            }

            if (key == 'startDate' || key == 'endDate') {
                rangeQuery(key,function(callback){
                    data[key] = callback;
                });
            }
        }

        Age.find(data, function(err,obj)
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
        Age.find(function (err, ages) {
            if (err)
                callback(false,err);
            else
                callback(true,ages);
        });
    },

    remove: function (id, callback) {
        Age.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Age.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, age) {
            // Age exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Age[key] = data[key];
                    }
                }
                Age.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Age);
                    }
                });
            }
            // Age is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, age);
            }
        });
    },
};