//import mongoose
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UsersSchema);
