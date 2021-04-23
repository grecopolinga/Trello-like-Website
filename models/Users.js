//import mongoose
const mongoose = require('mongoose');
const uuid = require('uuid');

const UsersSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        default: uuid.v4(),
    },
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
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UsersSchema);
