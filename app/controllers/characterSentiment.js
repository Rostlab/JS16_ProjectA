module.exports = {
    add: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');
        charactersSentimentStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });

    },

    get: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');
        charactersSentimentStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    getAll: function (req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');

        charactersSentimentStore.getAll(function(success,characters) {
            if(success)
                res.status(200).json(characters);
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});

        });
    },

    getByPLOD: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');

        charactersSentimentStore.getByPLOD(req.params.count, function(success, message) {
            if(success)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!'});
        });
    },

    getById: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');

        charactersSentimentStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    getByDescription: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');

        charactersSentimentStore.getByDescription(req.params.description, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character PLOD with that data existing!',data: message });
        });
    },

    edit: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');

        charactersSentimentStore.edit(req.params.id, function(success, message) {

        });
    },

    remove: function(req, res) {
        var charactersSentimentStore = require('../stores/charactersPlod');

        charactersSentimentStore.remove(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No PLOD existing with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    }
};
