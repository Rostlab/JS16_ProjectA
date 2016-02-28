module.exports = {
    add: function (req, res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    getAll: function (req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getAll(function(success,episodes) {
            res.status(200).json(episodes);
        });
    },

    get: function(req,res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No episode with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    getByName: function(req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getByName(req.params.episodeName, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No episode with that data existing!',data: message });
        });
    },

    getById: function(req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.getById(req.params.episodeId, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No episode with that data existing!',data: message });
        });
    },

    edit: function(req, res) {
        var episodesStore = require('../stores/episodes');

        episodesStore.edit(req.params.episodeId, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No episode exsiting with that id', id: req.params.episodeId });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    remove: function(req,res) {
        var episodesStore = require('../stores/episodes');
        episodesStore.remove(req.params.episodeId,function(success) {
            if(success == true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No episode with that id is existing.', id: req.params.episodeId });
        });
    }

};