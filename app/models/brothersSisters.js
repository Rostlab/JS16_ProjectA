// app/models/characters.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BrothersSistersSchema   = new Schema({
	
	id: Number,
	characterA: [{type: Schema.Types.ObjectId, ref: "Character"}],
	characterB: [{type: Schema.Types.ObjectId, ref: "Character"}]
	
	
});

module.exports = mongoose.model('BrothersSisters', BrothersSistersSchema);
