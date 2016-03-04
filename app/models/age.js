var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgeSchema = new Schema({
    name: {type: String, required: true},
    startDate: {type:Number,required: true},
	endDate: {type:Number,required: true},
    predecessor: {type: Schema.Types.ObjectId, ref: 'Age'},
    successor: {type: Schema.Types.ObjectId, ref: 'Age'}
});

module.exports = mongoose.model('Age', AgeSchema);
