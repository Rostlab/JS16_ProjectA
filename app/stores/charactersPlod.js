var CharacterPlod = require(__appbase + 'models/characterPlod');

module.exports = {

    add: function (data, callback) {
        var characterPlod = new CharacterPlod();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !CharacterPlod.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                characterPlod[key] = data[key];
            }
        }

        characterPlod.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,characterPlod);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !CharacterPlod.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        CharacterPlod.find(data, function (err, obj) {
            if (err || obj.length === 0) {
                callback(3, data);
            } else {
                callback(1, obj);
            }
        });
    },

    getAll: function (callback) {
        CharacterPlod.find(function (err, CharacterPlods) {
            if (err)
                callback(false,err);
            else
                callback(true,CharacterPlods);
        });
    },

    getByAlgorithm: function(algorithm, callback) {
        this.get({'algorithm':{ "$regex": algorithm, "$options": "i" } },function (success, message) {
            if (success == 1) {
                callback(success, message[0]);
            }
            else {
                callback(success, message);
            }
        });
    },

    getByPLOD: function(count, callback) {
        CharacterPlod.find({plod: {$exists: true, $ne: null}}).sort({plod: -1}).limit(parseInt(count)).exec(function(err,resp){
            if (err) {
                callback(false,err);
            }
            else {
                callback(true,resp);
            }
        });
    },

    getBySlug: function(slug, callback) {
        CharacterPlod.find({'characterSlug': { "$regex": slug, "$options": "i" } },function(err,resp){
            if (err) {
                callback(false,err);
            }
            else {
                callback(true,resp);
            }
        });
    },

    getByName: function(name, callback) {
        CharacterPlod.find({'character': { "$regex": name, "$options": "i" } },function(err,resp){
            if (err) {
                callback(false,err);
            }
            else {
                callback(true,resp);
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

    edit: function (id, data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !CharacterPlod.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, CharacterPlod) {
            // CharacterPlod exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        CharacterPlod[key] = data[key];
                    }
                }
                CharacterPlod.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,CharacterPlod);
                    }
                });
            }
            // CharacterPlod is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, CharacterPlod);
            }
        });
    },

    remove: function (id, callback) {
        CharacterPlod.remove({_id: id}, function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    }
};
