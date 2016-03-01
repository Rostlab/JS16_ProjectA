var Event = require(__appbase + 'models/event');

module.exports = {

    add: function (data, callback) {
        var event = new Event();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Event.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                event[key] = data[key];
            }
        }

        event.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,event);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Event.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Event.find(data, function(err,obj)
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
                callback(success,message[0])
            }
            else {
                callback(success,message);
            }
        });
    },

    getById: function(id, callback) {
        this.get({'_id': id},function(success,message){
            if(success == 1) {
                callback(success,message[0])
            }
            else {
                callback(success,message);
            }
        });
    },

    getAll: function (callback) {
        Event.find(function (err, events) {
            if (err)
                callback(false,err);
            else
                callback(true,events);
        });
    },

    remove: function (id, callback) {
        Event.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Event.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, event) {
            // Event exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Event[key] = data[key];
                    }
                }
                Event.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Event);
                    }
                });
            }
            // Event is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, event);
            }
        });
    },
};