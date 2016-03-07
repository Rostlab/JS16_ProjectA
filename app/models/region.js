var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RegionSchema   = new Schema({
    name: {type: String, required: true, unique: true},
    continent: {type: Schema.Types.ObjectId, ref: "Continent"},
    neighbors:[{type: Schema.Types.ObjectId, ref: "Region"}],
    cultures: [{type: Schema.Types.ObjectId, ref: "Culture"}],
    events: [{type: Schema.Types.ObjectId, ref: "Event"}],
    highlights: [String]										//Used for highlighting regions with polygons
});

module.exports = mongoose.model('Region', RegionSchema);
