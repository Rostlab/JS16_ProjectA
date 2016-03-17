var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSentiment = new Schema({
    currentLord: {type: String, ref: "Character"},
    date: {type:Date},
    posSum: {type: Number},
    negSum: {type: Number},
    posCount: {type: Number},
    negCount: {type: Number},
    nullCount: {type: Number}
});

module.exports = mongoose.model('CharacterSentiment', CharacterSentiment);