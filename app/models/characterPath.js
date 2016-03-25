var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterPathSchema = new Schema({
    name: String,
    path: Array
});

module.exports = mongoose.model('CharacterPath', CharacterPathSchema);
