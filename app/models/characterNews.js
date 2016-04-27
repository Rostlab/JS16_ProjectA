var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterNews = new Schema({
    name : {type: String, ref: 'Character', required: true, unique: true},
    slug: {type: String, unique: true, required: true},
    text: {type: String},
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('CharacterNews', CharacterNews);
