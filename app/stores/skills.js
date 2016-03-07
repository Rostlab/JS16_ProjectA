/*
var Skill = require(__appbase + 'models/skill');

module.exports = {

    add: function (data, callback) {
        var skill = new Skill();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Skill.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                skill[key] = data[key];
            }
        }

        skill.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,skill);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Skill.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Skill.find(data, function(err,obj)
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
        Skill.find(function (err, skills) {
            if (err)
                callback(false,err);
            else
                callback(true,skills);
        });
    },

    remove: function (id, callback) {
        Skill.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Skill.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, skill) {
            // Skill exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Skill[key] = data[key];
                    }
                }
                Skill.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Skill);
                    }
                });
            }
            // Skill is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, skill);
            }
        });
    },
};*/