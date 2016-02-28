var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseTypeSchema   = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('HouseType', HouseTypeSchema);
