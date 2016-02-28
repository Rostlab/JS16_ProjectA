var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    befAC: Boolean,
    date: Date,
    age: {type: Schema.types.ObjectId, ref: 'Age'},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);
