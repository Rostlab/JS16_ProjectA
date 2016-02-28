var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContinentSchema   = new Schema({
		_id: ObjectId,
    name: String
});

module.exports = mongoose.model('Continent', ContinentSchema);
