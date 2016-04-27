var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterNotes = new Schema({
    name : {type: String, ref: 'Character', required: true, unique: true},
    slug: {type: String, unique: true, required: true},
    text: {type: String},
    createdAt: {type: Date}
});

module.exports = mongoose.model('CharacterNotes', CharacterNotes);
