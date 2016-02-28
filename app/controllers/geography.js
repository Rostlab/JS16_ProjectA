module.exports = {
    addContinent: function (req, res) {
        var continentsStore = require('../stores/continents');
        continentsStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    getAllContinents: function (req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.getAll(function(success,continents) {
            res.status(200).json(continents);
        });
    },

    getContinents: function(req,res) {
        var continentsStore = require('../stores/continents');
        continentsStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No continents with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    getContinentByName: function(req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No continent with that data existing!',data: message });
        });
    },

    getContinentById: function(req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No continent with that data existing!',data: message });
        });
    },

    editContinent: function(req, res) {
        var continentsStore = require('../stores/continents');

        continentsStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No continent exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    removeContinent: function(req,res) {
        var continentsStore = require('../stores/continents');
        continentsStore.remove(req.params.id,function(success) {
            if(success == true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No continent with that id is existing.', id: req.params.id });
        });
    }

};