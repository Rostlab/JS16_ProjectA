var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpisodeSchema = new Schema({
    _id: ObjectId,
    name: String,
    character: [{type: Schema.types.ObjectId, ref: 'Character'}],
    start_time: {type: Date, default: Date.now},
    episode_length: {type: Number, min: 60, max: 70},        // maximum 70 min, minimum 60 min duration as the episodes differ in duration
    
    predecessor: {type: Schema.types.ObjectId, ref: 'Episode'},
    successor: {type: Schema.types.ObjectId, ref: 'Episode'},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Episode', EpisodeSchema);
