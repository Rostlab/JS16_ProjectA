// app/models/characters.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParentsSchema   = new Schema({
	
	id: Number,
	parent: [{type: Schema.Types.ObjectId, ref: "Character"}],
	child: [{type: Schema.Types.ObjectId, ref: "Character"}]
	
	
});

module.exports = mongoose.model('Parents', ParentsSchema);