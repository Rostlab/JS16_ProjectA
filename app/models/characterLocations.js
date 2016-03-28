var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterLocations = new Schema({
    name : {type: String, ref: 'Character', required: true, unique: true},
    slug: {type: String, unique: true, required: true},
    locations: [String]
});

module.exports = mongoose.model('CharacterLocations', CharacterLocations);
