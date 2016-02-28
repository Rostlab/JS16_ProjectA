var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpisodeSchema = new Schema({
    name: String,
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    startTime: {type: Date, default: Date.now},
    episodeLength: {type: Number, min: 60, max: 70},        // maximum 70 min, minimum 60 min duration as the episodes differ in duration

    predecessor: {type: Schema.Types.ObjectId, ref: 'Episode'},
    successor: {type: Schema.Types.ObjectId, ref: 'Episode'},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Episode', EpisodeSchema);
