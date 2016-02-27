// app/models/characters.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSchema = new Schema({
    name: {type: String, required: true},                                // Rhaegar
    title: String,                                                        // Prince of Dragonstone Ser
    male: boolean,                                                       // Male
    culture: String,                                                      // Valyrian
    age: {type: Number, min: 1, max: 200},                              // ??
    born: String,                                                        // 259 AC
    died: String,  	                                                     // 283 AC

    brothers: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    sisters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    mother: {type: Schema.Types.ObjectId, ref: 'Character'},
    father: {type: Schema.Types.ObjectId, ref: 'Character'},
    children: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    heir: {type: Schema.Types.ObjectId, ref: 'Character'},

    battles: [{type: Schema.Types.ObjectId, ref: 'Battle'}],

    placeOfBirth: String,                                                 // Summerhall
    placeOfDeath: String,                                                 // Trident
    house: {type: Schema.Types.ObjectId, ref: "House"},                   // House Targaryen
    spouse: [{type: Schema.Types.ObjectId, ref: 'Character'}],            // Princess Elia Martell
    skill: [{type: Schema.Types.ObjectId, ref: "Skill"}],                // one to many - talented musician and skilled knight
    episode: [{type: Schema.types.ObjectId, ref: 'Episode'}],    // one character appears in different episodes
    eventName: String,                                                   // A game of thrones, A clash with kings
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Character', CharacterSchema);
