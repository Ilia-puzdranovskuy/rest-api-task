const mongoose = require('mongoose');
const { object } = require('webidl-conversions');

const  itemsSchema = new mongoose.Schema({
    createdAt: {
    type: Date, default: Date.now
    },
    title:{
        type: String, trim: true, required: true 
    },
    price:{
        type: String, trim: true, required: true 
    },
    image:{
        type: String, trim: true, default:"http://example.com/images/**/*.jpg" 
    },
    user_id:{
        type: String, trim: true, required: true 
    },
    user:{
        type: Object
    }
     
});

const Items = mongoose.model('Itemss', itemsSchema);

module.exports = Items;