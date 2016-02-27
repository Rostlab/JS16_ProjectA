module.exports = {
    addHouse: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.addHouse(req.body,function(success, message) {
            if(success == true)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(400).json({ message: 'Error: Bad request.', error: message });
        });
    },

    getHouses: function (req, res) {
        var housesStore = require('../stores/houses');
        var houses;
        housesStore.getHouses(function(houses) {
            if(houses != false) {
                res.status(200).json(houses);
            }
            else {
                res.status(400).json({ message: 'Error', error: houses });
            }
        });

    }
};