var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CitiesSchema   = new Schema({
    name: {type: String, required: true},
	coordX: String,												//Mongoose only supports Number (Integer)
	coordY: String,												//For floats or doubles, it automatically converts it to String
	type: String,
	prio: { type: Number, min: 0, max: 6},
	link: String
});

module.exports = mongoose.model('Cities', CitiesSchema);
