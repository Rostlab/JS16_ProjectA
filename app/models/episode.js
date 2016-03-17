var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EpisodeSchema = new Schema({
    totalNr      : Number, // episode nr. overall
    nr           : Number, // episode nr in season
    season       : Number,
    name         : {type: String, required: true, unique: true},
    characters   : [{type: String, ref: 'Character'}],
    airDate      : Date,
    episodeLength: {type: Number, min: 60, max: 70},        // maximum 70 min, minimum 60 min duration as the episodes differ in duration

    predecessor: {type: String, ref: 'Episode'},
    successor  : {type: String, ref: 'Episode'},
    director   : String,

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Episode', EpisodeSchema);
