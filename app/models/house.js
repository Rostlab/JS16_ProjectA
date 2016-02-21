var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('House', HouseSchema);