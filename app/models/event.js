var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: {type: String, required: true, unique: true},
    date: Number,
    age: {type: Schema.Types.ObjectId, ref: 'Age'},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);
