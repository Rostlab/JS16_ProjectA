var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EventSchema = new Schema({
    name: {type: String}, // not required and unique since name is not always existing.
    date: Number,
    age : {type: String, ref: 'Age'},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);
