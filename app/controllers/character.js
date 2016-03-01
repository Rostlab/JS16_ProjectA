module.exports = {
    add: function (req, res) {
        var charactersStore = require('../stores/characters');
        charactersStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    getAll: function (req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.getAll(function(success,characters) {
            res.status(200).json(characters);
        });
    },

    get: function(req,res) {
        var charactersStore = require('../stores/characters');
        charactersStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    getByName: function(req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    getById: function(req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No character with that data existing!',data: message });
        });
    },

    edit: function(req, res) {
        var charactersStore = require('../stores/characters');

        charactersStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No character exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    remove: function(req,res) {
        var charactersStore = require('../stores/characters');
        charactersStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No character with that id is existing.', id: req.params.id });
        });
    },

    addSkill: function (req, res) {
        var skillsStore = require('../stores/skills');
        skillsStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    getAllSkills: function (req, res) {
        var skillsStore = require('../stores/skills');

        skillsStore.getAll(function(success,skills) {
            res.status(200).json(skills);
        });
    },

    getSkills: function(req,res) {
        var skillsStore = require('../stores/skills');
        skillsStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No skills with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },

    getSkillByName: function(req, res) {
        var skillsStore = require('../stores/skills');

        skillsStore.getByName(req.params.name, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No skill with that data existing!',data: message });
        });
    },

    getSkillById: function(req, res) {
        var skillsStore = require('../stores/skills');

        skillsStore.getById(req.params.id, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No skill with that data existing!',data: message });
        });
    },

    editSkill: function(req, res) {
        var skillsStore = require('../stores/skills');

        skillsStore.edit(req.params.id, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No skill exsiting with that id', id: req.params.id });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    removeSkill: function(req,res) {
        var skillsStore = require('../stores/skills');
        skillsStore.remove(req.params.id,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No skill with that id is existing.', id: req.params.id });
        });
    }

};