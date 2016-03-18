var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterPathSchema = new Schema({
    character : {type: Schema.Types.ObjectId, ref: “Character”},
    path: String	//Required as store for json object, containing the path 
});

module.exports = mongoose.model(‘CharacterPath’, CharacterPathSchema);
