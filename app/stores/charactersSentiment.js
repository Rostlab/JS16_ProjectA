var CharacterSentiment = require(__appbase + 'models/characterSentiment');

module.exports = {

    add: function (data, callback) {
        var characterSentiment = new CharacterSentiment();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !CharacterSentiment.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                characterSentiment[key] = data[key];
            }
        }

        characterSentiment.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,characterSentiment);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !CharacterSentiment.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        CharacterSentiment.find(data, function (err, obj) {
            if (err || obj.length === 0) {
                callback(3, data);
            } else {
                callback(1, obj);
            }
        });
    },

    getAll: function (callback) {
        CharacterSentiment.find(function (err, CharacterSentiments) {
            if (err)
                callback(false,err);
            else
                callback(true,CharacterSentiments);
        });
    },

    getByDescription: function(description, callback) {
        this.get({'description':{ "$regex": description, "$options": "i" } },function (success, message) {
            if (success == 1) {
                callback(success, message[0]);
            }
            else {
                callback(success, message);
            }
        });
    },

    getByDate: function(date, callback) {
        this.get({'date':{ "$regex": date, "$options": "i" } },function (success, message) {
            if (success == 1) {
                callback(success, message[0]);
            }
            else {
                callback(success, message);
            }
        });
    },

    getByTimeRange: function(beginDate, endDate, callback) {
        CharacterSentiment.find({}).where('date').gte(beginDate).lt(endDate).exec(function (err, CharacterSentiments) {
            if (err)
                callback(3,err);
            else
                callback(1,CharacterSentiments);
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
            if (data.hasOwnProperty(key) && !CharacterSentiment.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, CharacterSentiment) {
            // CharacterSentiment exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        CharacterSentiment[key] = data[key];
                    }
                }
                CharacterSentiment.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,CharacterSentiment);
                    }
                });
            }
            // CharacterSentiment is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, CharacterSentiment);
            }
        });
    },

    remove: function (id, callback) {
        CharacterSentiment.remove({_id: id}, function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    }
};
