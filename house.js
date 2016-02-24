var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HouseSchema   = new Schema({
    name: String,
    character: [{type: Schema.Types.ObjectId, ref: "Character"}]
});

module.exports = mongoose.model('House', HouseSchema);
