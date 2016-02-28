var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CultureSchema   = new Schema({
		_id: ObjectId,
    name: String,
    //todo missing fields?    
});

module.exports = mongoose.model('Culture', CultureSchema);
