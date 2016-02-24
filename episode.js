var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EpisodeSchema   = new Schema({
    name: String,
    character: [{type: mongoose.Schema.types.ObjectId, ref: 'Character'}],
    start_time: { type : Date, default: Date.now},
    start_date: Date,
    end_date: Date,
    created_at: { type : Date, default: Date.now},
    updated_at: { type : Date, default: Date.now},
});

module.exports = mongoose.model('House', HouseSchema);
