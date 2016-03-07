var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
    name: {type: String, required: true},
    isExtinct: Boolean,
    coatOfArms: String,                                                   // Sable, a dragon thrice-headed gules
    words: String,                                                        // Fire and Blood
    currentLord: {type: String, ref: "Character"},         // Queen Daenerys Targaryen
    overlord: {type: String, ref: "House"},            // None
    title: String,                                                      // King of the Andals, the Rhoynar, and the First Men,Lord of the Seven Kingdoms
    region: String,                 // Crownlands (formerly Valyria)
    cadetBranch: String,                                                  // House Blackfyre is the cadet branch of House Targaryen
    ancestralWeapon: [String],                                            // Blackfyre and Dark Sister
    founded: String,                                                      // > 126 BC, Age of Heroes
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('House', HouseSchema);
