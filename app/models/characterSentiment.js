var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterSentimentSchema = new Schema({
    character: {type: mongoose.Schema.Types.ObjectId, ref: "Character"},
    date     : {type: Date, default: Date.now},		// Similar to a "created at" field
    posSum   : {type: Number},
    negSum   : {type: Number},
    posCount : {type: Number},
    negCount : {type: Number},
    nullCount: {type: Number},
    description: {type: String}						// To distinguish between data sources. E.g. Group 6, Group 7
});

module.exports = mongoose.model('CharacterSentiment', CharacterSentimentSchema);