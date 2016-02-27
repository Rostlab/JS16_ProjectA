// app/models/characters.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CharacterSchema   = new Schema({
	_id: ObjectId,
    name: String,                                                         // Rhaegar
    title: String,                                                        // Prince of Dragonstone Ser
    gender: String,                                                       // Male 
    culture: String,                                                      // Valyrian
    age: { type: Number, min: 8, max: 100 },                              // ??
    born: Date,                                                           // 259 AC 
    died: Date,  	                                                     // 283 AC
    
	/*
	brothersSisters: {
		    			characters:[{
		    							_id: { type: String, ref: 'Character' }
		    						}] 
		    		}, //no sister
    mother: {
    			character:{
    						_id: { type: String, ref: 'Character' }
    						}
    		},		// was the eldest son of King Aerys II Targaryen 
    father: {
    			character:{
    						_id: { type: String, ref: 'Character' }
    						}
    		},		// his sister-wife, Queen Rhaella.
    */
	
	
	brothersSisters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
	mother: {type: Schema.Types.ObjectId, ref: 'Character'},
	father: {type: Schema.Types.ObjectId, ref: 'Character'},
    children: [{type: Schema.Types.ObjectId, ref: 'Character'}],	
    heir: {type: Schema.Types.ObjectId, ref: 'Character'},
    
    battles: [{type: Schema.Types.ObjectId, ref: 'Battle'}]
    
    placeOfBirth: String,                                                 // Summerhall
    placeOfDeath: String,                                                 // Trident
    house: {type: Schema.Types.ObjectId, ref: "House"},                   // House Targaryen
    spouse: String,                                                       // Princess Elia Martell
    skill: [{type: Schema.Types.ObjectId, ref: "Skill"}]                  // one to many - talented musician and skilled knight
    episode: [{type: Schema.types.ObjectId, ref: 'Episode'}],    // one character appears in different episodes
    event_name: String,                                                   // A game of thrones, A clash with kings
    created_at: { type : Date, default: Date.now},            
    updated_at: { type : Date, default: Date.now}             
	
});

module.exports = mongoose.model('Character', CharacterSchema);
