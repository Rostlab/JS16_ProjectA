// app/models/characters.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CharacterSchema   = new Schema({
    id: ObjectId,
    name: String,                                             // Rhaegar
    title: String,                                            // Prince of Dragonstone Ser
    gender: String,                                           // Male 
    culture: String,                                          // Valyrian
    age: { type: Number, min: 18, max: 100 },                 // ??
    born: String,                                             // 259 AC 
    died: String,                                             // 283 AC
    placeOfBorn: String,                                      // Summerhall
    placeOfDie: String,                                       // In Trident
	house: {type: Schema.Types.ObjectId, ref: "House"},       // House Targaryen
	skill: [{type: Schema.Types.ObjectId, ref: "Skill"}]      // one to many - talented musician and skilled knight
	event_name: String,                                       // A game of thrones, A clash with kings
	created_at: { type : Date, default: Date.now},            
    updated_at: { type : Date, default: Date.now}             
	
});

module.exports = mongoose.model('Character', CharacterSchema);
