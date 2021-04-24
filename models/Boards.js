//import mongoose
const mongoose = require('mongoose');
const uuid = require('uuid');

const BoardsSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        default: uuid.v4(),
    },
    boardName: {
        type: String,
        required: true,
    },
    boardLabel: {
        type: String,
        required: false,
    },
    boardFavorite: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Board', BoardsSchema);
