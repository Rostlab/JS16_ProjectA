var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterPlodSchema = new Schema({
    character: {type: String, ref: 'Character'},
    characterSlug: String,
    plod: {type: Number},           					//% likelihood of death
    date: {type: Date, default: Date.now},				// Similar to "created at" field. It allows a timeline, if necessary
    algorithm: {type: String}     						// Specifies the method, how it was collected (the algorithm). Can be e.g. Group B6, Group B7, Method XYZ
});

module.exports = mongoose.model('CharacterPlod', CharacterPlodSchema);
