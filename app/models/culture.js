var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CultureSchema   = new Schema({
    name: {type: String, required: true},
});

module.exports = mongoose.model('Culture', CultureSchema);
