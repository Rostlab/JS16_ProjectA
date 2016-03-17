var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AgeSchema = new Schema({
    name       : {type: String, required: true, unique: true},
    startDate  : {type: Number},
    endDate    : {type: Number},
    predecessor: {type: String, ref: 'Age'},
    successor  : {type: String, ref: 'Age'}
});

module.exports = mongoose.model('Age', AgeSchema);
