var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgeSchema = new Schema({
    _id: ObjectId,
    name: String,
    startDate: Date,
	endDate: Date,
    predecessor: {type: Schema.types.ObjectId, ref: 'Age'},
    successor: {type: Schema.types.ObjectId, ref: 'Age'}
});

module.exports = mongoose.model('Age', AgeSchema);

