var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
    name: String,                                                         // Targaryen
    type: {type: Schema.Types.ObjectId, ref: "HouseTypes"},               // Current, exiled or extinct Great house
    coatOfArms: String,                                                   // Sable, a dragon thrice-headed gules
    words: String,                                                        // Fire and Blood
    currentLord: {type: Schema.Types.ObjectId, ref: "Character"},         // Queen Daenerys Targaryen
    overlord: {type: Schema.Types.ObjectId, ref: "Character"},            // None
    title: [String],                                                      // King of the Andals, the Rhoynar, and the First Men,Lord of the Seven Kingdoms
    region: String,                                                       // Crownlands (formerly Valyria)
    cadetBranch: String,                                                  // House Blackfyre is the cadet branch of House Targaryen
    ancestralWeapon: [String],                                            // Blackfyre and Dark Sister
    founded: String                                                       // > 126 BC, Age of Heroes
});

module.exports = mongoose.model('House', HouseSchema);
