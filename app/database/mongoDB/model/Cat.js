const mongoose = require('mongoose');
const { Schema } = mongoose;

const catSchema = new Schema({
    name : String,
    age: Number,
    owner: String,
    status: String
    
    
});

module.exports = mongoose.model('cat', catSchema);;