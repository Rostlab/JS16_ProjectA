var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RegionSchema   = new Schema({
    name: {type: String, required: true},
    continent: {type: Schema.Types.ObjectId, ref: "Continent"},
    neighbors:[{type: Schema.Types.ObjectId, ref: "Region"}],
    cultures: [{type: Schema.Types.ObjectId, ref: "Culture"}],
    houses: [{type: Schema.Types.ObjectId, ref: "House"}],
    events: [{type: Schema.Types.ObjectId, ref: "Event"}]
});

module.exports = mongoose.model('Region', RegionSchema);
