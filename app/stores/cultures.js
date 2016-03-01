var Culture = require(__appbase + 'models/culture');

module.exports = {

    add: function (data, callback) {
        var culture = new Culture();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Culture.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                culture[key] = data[key];
            }
        }

        culture.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,culture);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Culture.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Culture.find(data, function(err,obj)
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
        Culture.find(function (err, cultures) {
            if (err)
                callback(false,err);
            else
                callback(true,cultures);
        });
    },

    remove: function (id, callback) {
        Culture.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Culture.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, culture) {
            // Culture exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Culture[key] = data[key];
                    }
                }
                Culture.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Culture);
                    }
                });
            }
            // Culture is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, culture);
            }
        });
    },
};