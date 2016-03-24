var CharacterSentiment = require(__appbase + 'models/characterSentiment');

module.exports = {

    add: function(data,callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !CharacterSentiment.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        CharacterSentiment.insert(data, function (err, obj) {
            if (err || obj.length === 0) {
                callback(3, data);
            } else {
                callback(1, obj);
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

    getByDescription: function(name, callback) {
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


    getByTimeframe: function(startdate, enddate, callback) {
        CharacterSentiment.find({Date: $gte: ISODate(startdate), $lt: ISODate(enddate)}).exec(function (err, CharacterSentiments) {
            if (err)
                callback(false,err);
            else
                callback(true,CharacterSentiments);
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
        CharacterSentiment.find(function (err, CharacterSentiments) {
            if (err)
                callback(false,err);
            else
                callback(true,CharacterSentiments);
        });
    }
};
