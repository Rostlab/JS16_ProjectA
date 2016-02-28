var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BattleSchema   = new Schema({
	_id: Schema.Types.ObjectId,
    name: String,                                                         // battle's name
    date: Date,                                                        // > 126 BC
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],          // Characters fought in this battle
	charactersDied: [{type: Schema.Types.ObjectId, ref: 'Character'}],          // Characters died in this battle
	event: {type: Schema.Types.ObjectId, ref: "Event"}
});

module.exports = mongoose.model('Battle', BattleSchema);
