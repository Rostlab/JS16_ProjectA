/*
Don't consider this for now till another project tells us it is really needed.

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BattleSchema   = new Schema({
    name: {type: String, required: true, unique: true},                                // battle's name
    date: Number,                                                        // > 126 BC
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],       // Characters fought in this battle
	charactersDied: [{type: Schema.Types.ObjectId, ref: 'Character'}],   // Characters died in this battle
	event: {type: Schema.Types.ObjectId, ref: "Event"}
});

module.exports = mongoose.model('Battle', BattleSchema);
*/