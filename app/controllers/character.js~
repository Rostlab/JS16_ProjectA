module.exports = {

    addCharacter: function (req, res) {
        var characterStore = require('../stores/character');
        characterStore.addCharacter(req.body,function(success, message) {
            if(success == true)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getCharacters: function (req, res) {
        var characterStore = require('../stores/character');

        characterStore.getCharacters(function(character) {
            if(character != false) {
                res.status(200).json(character);
            }
            else {
                res.status(400).json({ message: 'Error', error: character });
            }
        });

    },

    getCharacterByName: function(req, res) {
        var characterStore = require('../stores/character');

        characterStore.getCharacterByName(req.params.characterName, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(200).json({ message: 'Failure. No character with name "'+req.params.characterName +'" existing!' });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getCharacterById: function(req, res) {
        var characterStore = require('../stores/character');

        characterStore.getCharacterById(req.params.characterId, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(200).json({ message: 'Failure. No character with id "'+req.params.characterId +'" existing!' });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },
    editCharacter: function(req, res) {
        var characterStore = require('../stores/character');

        characterStore.editCharacter(req.params.characterId, req.body,function(success, message) {
            if(success == true)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },
    removeCharacter: function(req,res) {
        var characterStore = require('../stores/character');
        charactersStore.removeCharacter(req.params.characterId,function(success) {
            if(success == true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(200).json({ message: 'Failure: No character with the id "'+req.params.characterId +'" is existing.' });
        });
    }
};
