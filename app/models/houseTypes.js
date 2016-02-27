var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseTypeSchema   = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('HouseType', HouseSchema);
