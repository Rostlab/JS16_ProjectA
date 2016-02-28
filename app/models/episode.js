var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpisodeSchema = new Schema({
    name: String,
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    start_time: {type: Date, default: Date.now},
    episode_length: {type: Number, min: 60, max: 70},        // maximum 70 min, minimum 60 min duration as the episodes differ in duration

    predecessor: {type: Schema.Types.ObjectId, ref: 'Episode'},
    successor: {type: Schema.Types.ObjectId, ref: 'Episode'},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Episode', EpisodeSchema);
