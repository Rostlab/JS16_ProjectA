module.exports = {
    addHouse: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.addHouse(req.body,function(success) {
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