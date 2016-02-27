var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,                                                         // Targaryen
    type: {type: Schema.Types.ObjectId, ref: "HouseTypes"},                                                         // 0 = Current Great house
                                                                          // 1 = Exiled Great house
                                                                          // 2 = Extinct Great house
    coatOfArms: String,                                                   // Sable, a dragon thrice-headed gules
    words: String,                                                        // Fire and Blood
    currentLord: String,  // shouldn´ that use a reference?               // Queen Daenerys Targaryen
                          // What means current? After season/book?
    overlord: String,                                                     // None
    title: [String],                                                      // King of the Andals, the Rhoynar, and the First Men,Lord of the Seven Kingdoms
                                                                          // Prince of Dragonstone, Prince of Summerhall
    region: String,                                                       // Crownlands (formerly Valyria)
    cadetBranch: String,                                                  // House Blackfyre is the cadet branch of House Targaryen
    ancestralWeapon: [String],                                            // Blackfyre and Dark Sister
    founded: String                                                       // > 126 BC, Age of Heroes

    // To get the characters of a house: api/characters/byHouse/Targaryen
    // character: [{type: Schema.Types.ObjectId, ref: 'Character'}]          // Characters belong to this house
});

module.exports = mongoose.model('House', HouseSchema);
