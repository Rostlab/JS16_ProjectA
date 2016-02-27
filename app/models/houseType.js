var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseTypeSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('HouseType', HouseTypeSchema);
