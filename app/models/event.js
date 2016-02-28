var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({

    _id: ObjectId,
    name: String,
    befAC: Boolean,
    date: Number,
    age: {type: Schema.types.ObjectId, ref: 'Age'},
    characters: [{type: Schema.types.ObjectId, ref: 'Character'}],
    battles: [{type: Schema.types.ObjectId, ref: 'Battle'}],
    
    
    predecessor: {type: Schema.types.ObjectId, ref: 'Episode'},
    successor: {type: Schema.types.ObjectId, ref: 'Episode'},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);
