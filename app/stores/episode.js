var Episode = require(__appbase + 'models/episode');

module.exports = {

    add: function (data, callback) {
        var episode = new Episode();

        // filter by house schema
        Episode.schema.eachPath(function (path) {
            if (path == '_id' || path == '__v') {
                return;
            }

            // add field data to new house document
            if (data.hasOwnProperty(path)) {
                episode[path] = data[path];
            }
        });

        episode.save(function (err) {
            if (err) {
                callback(false, err);
            } else {
                callback(true, episode);
            }
        });
    },
    getByName: function (name, callback) {
        Episode.findOne({name: name}, function (err, obj) {
            if (err) {
                callback(2, err);
            } else if (obj == null) {
                callback(3, 'No episode with name "' + name + '" in the database.');
            } else {
                callback(1, obj);
            }
        });
    },
    getById: function (id, callback) {
        Episode.findOne({'_id': id}, function (err, obj) {
            if (err) {
                callback(2, err);
            } else if (obj == null) {
                callback(3, 'No episode with id "' + id + '" in the database.');
            } else {
                callback(1, obj);
            }
        });
    },
    getAll: function (id, callback) {
        Episode.find(function (err, houses) {
            if (err) {
                callback(err);
            } else {
                callback(houses);
            }
        });
    },

    remove: function (id, callback) {
        Episode.remove({
            _id: id
        }, function (err, house) {
            if (err) {
                callback(false);
            } else {
                callback(true);
            }
        });

    },

    edit: function (id, data, callback) {
        this.getById(id, function (success, episode) {
            if (success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        episode[key] = data[key];
                    }
                }
                episode.save(function (err) {
                    if (err) {
                        callback(false, err);
                    } else {
                        callback(true, episode);
                    }
                });
            } else if (success == 3) { // house is not existing
                callback(false, 'Failure. No house with id "' + id + '" existing!')
            } else {
                callback(false, episode);
            }
        });
    },
};