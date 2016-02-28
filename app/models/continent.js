var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContinentSchema   = new Schema({
	_id: ObjectId,
    name: String,
	neighbors: [{type: Schema.Types.ObjectId, ref: "Region"}]
});

module.exports = mongoose.model('Continent', ContinentSchema);
