var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
	id: ObjectId,
    name: String,
	characters: [{type: Schema.Types.ObjectId, ref: "Character"}]
});

var CharacterSchema   = new Schema({
	id: ObjectId,
    name: String,
	house: {type: Schema.Types.ObjectId, ref: "House"}
});

module.exports = mongoose.model('Character', HouseSchema);
module.exports = mongoose.model('House', HouseSchema);
