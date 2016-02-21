module.exports = {
    addHouse: function (req, res) {
        var House = require('../models/house');
        var house = new House();
        house.name = req.body.name;

        house.save(function(err) {
            if (err){
                res.send(err);
            }
            else {
                res.json({ message: 'House created!' });
            }
        });
    }
};