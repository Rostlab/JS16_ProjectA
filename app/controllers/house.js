module.exports = {
    add: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.add(req.body,function(success, message) {
            if(success == true)
                res.status(201).json({ message: 'Success', data: message });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getAll: function (req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getAll(function(success,houses) {
            res.status(200).json(houses);
        });
    },

    get: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: req.body });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getByName: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getByName(req.params.houseName, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No house with name "'+req.params.houseName +'" existing!' });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getById: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getById(req.params.houseId, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No house with id "'+req.params.houseId +'" existing!' });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    edit: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.edit(req.params.houseId, req.body,function(success, message) {
            if(success == true)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    remove: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.remove(req.params.houseId,function(success) {
            if(success == true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No house with the id "'+req.params.houseId +'" is existing.' });
        });
    },

    addType: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.addType(req.body.name,function(success, message) {
            if(success == true)
                res.status(201).json({ message: 'Success', data: message });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getAllTypes: function (req, res) {
        var housesStore = require('../stores/houses');
        var houses;
        housesStore.getAllTypes(function(types) {
            if(types != false) {
                res.status(200).json(types);
            }
            else {
                res.status(400).json({ message: 'Error', error: types });
            }
        });
    },

    removeType: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.removeType(req.params.houseTypeId,function(success) {
            if(success == true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No houseType with the id "'+req.params.houseTypeId +'" is existing.' });
        });
    },
};