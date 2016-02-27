var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
	_id: ObjectId
    name: String,                                                         // House Targaryen
    type: String,                                                         // Type of houses: Current Great house, Exiled Great house, Extinct Great house
    coat_of_arms: String,                                                 // Sable, a dragon thrice-headed gules  
    words: String,                                                        // Fire and Blood
    current_lord: String,                                                 // Queen Daenerys Targaryen
    overlord: String,                                                     // None
    title: [String],                                                      // King of the Andals, the Rhoynar, and the First Men,Lord of the Seven Kingdoms
                                                                          // Prince of Dragonstone, Prince of Summerhall
    region: String,                                                       // Crownlands (formerly Valyria)
    cadet_branch: String,                                                 // House Blackfyre is the cadet branch of House Targaryen
    ancestral_weapon: [String],                                           // Blackfyre and Dark Sister
    founded: Date,                                                        // > 126 BC
    character: [{type: Schema.Types.ObjectId, ref: 'Character'}]          // Characters belong to this house
});

module.exports = mongoose.model('House', HouseSchema);
