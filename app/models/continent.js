var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContinentSchema   = new Schema({
    name: {type: String, required: true, unique: true},
	neighbors: [{type: Schema.Types.ObjectId, ref: "Continent"}]
});

module.exports = mongoose.model('Continent', ContinentSchema);
