const mongoose = require('mongoose');

const  userSchema = new mongoose.Schema({
    phone: {
        type: String, trim: true 
    },
    name: {
        type: String, trim: true,required: true 
    },
    email:{
        type: String, trim: true, required: true, unique: 'Email  used!'
    },
    password:{
        type: String,required: true
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;