var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SkillSchema   = new Schema({
	_id: ObjectId,
    name: String,
    character: [{type: Schema.Types.ObjectId, ref: "Character"}]   //  a particular skill can be obtained by many characters
});

module.exports = mongoose.model('Skill', SkillSchema);
