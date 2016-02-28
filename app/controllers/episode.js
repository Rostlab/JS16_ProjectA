var episodeStore = require(__appbase + 'stores/episode');

module.exports = {
    add: function (req, res) {
        episodeStore.add(req.body, function (success, message) {
            if (success == true) {
                res.status(200).json({message: 'Success', data: message});
            } else {
                res.status(400).json({message: 'Error: Bad request.', error: message});
            }
        });
    },

    getAll: function (req, res) {
        episodeStore.getAll(function (episodes) {
            if (episodes != false) {
                res.status(200).json(episodes);
            } else {
                res.status(400).json({message: 'Error', error: episodes});
            }
        });

    },
    getByName: function (req, res) {
        episodeStore.getByName(req.params.name, function (success, message) {
            if (success == 1) {
                res.status(200).json({message: 'Success', data: message});
            } else if (success == 3) {
                res.status(200).json({message: 'Failure. No episode with name "' + req.params.name + '" existing!'});
            } else {
                res.status(400).json({message: 'Error: Bad request.', error: message});
            }
        });
    },
    getById: function (req, res) {
        episodeStore.getById(req.params.id, function (success, message) {
            if (success == 1) {
                res.status(200).json({message: 'Success', data: message});
            } else if (success == 3) {
                res.status(200).json({message: 'Failure. No episode with id "' + req.params.id + '" existing!'});
            } else {
                res.status(400).json({message: 'Error: Bad request.', error: message});
            }
        });
    },
    edit: function (req, res) {
        episodeStore.edit(req.params.id, req.body, function (success, message) {
            if (success == true) {
                res.status(200).json({message: 'Success', data: message});
            } else {
                res.status(400).json({message: 'Error: Bad request.', error: message});
            }
        });
    },
    remove: function (req, res) {
        episodeStore.remove(req.params.id, function (success) {
            if (success == true) {
                res.status(200).json({message: 'Success.'});
            } else {
                res.status(200).json({message: 'Failure: No episode with the id "' + req.params.id + '" is existing.'});
            }
        });
    }
};