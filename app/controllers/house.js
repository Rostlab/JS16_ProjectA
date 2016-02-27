module.exports = {
    addHouse: function (req, res) {
        var data = {
            name: req.body.name
            // TODO: Further glue statements necessary when model is fixed.
            // For testing purposes only the name field left in the model.
        }
        var housesStore = require('../stores/houses');
        housesStore.addHouse(data,function(success) {
            if(success)
                res.json({ message: 'House created!' });
            else
                res.json({ message: 'House could not be created. Check console.' });
        });
    },

    getHouses: function (req, res) {
        var housesStore = require('../stores/houses');
        var houses;
        housesStore.getHouses(function(houses) {
            if(houses != false) {
                res.json(houses);
            }
            else {
                res.json({ message: 'Error: ' + houses });
            }
        });

    }
};