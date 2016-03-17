var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CitySchema = new Schema({
    name     : {type: String, required: true, unique: true},
    coordX   : String,												//Mongoose only supports Number (Integer)
    coordY   : String,												//For floats or doubles, it automatically converts it to String
    type     : String,
    priority : {type: Number, min: 0, max: 6},
    link     : String,
    continent: {type: String, ref: "Continent"},
    regions  : [{type: String, ref: "Region"}]
});

module.exports = mongoose.model('City', CitySchema);
