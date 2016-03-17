var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SentimentSchema = new Schema({
	'characterName' : [{type: String, ref: 'Character'}],
	'date' : Date,
	'posSum' : Number,
	'negSum' : Number,
	'posCount' : Number,
	'negCount' : Number,
	'nullCount' : Number
});

module.exports = mongoose.model('Sentiment', SentimentSchema);
