var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CultureSchema   = new Schema(
    name: String,
    //todo missing fields?    
});

module.exports = mongoose.model('Culture', CultureSchema);
