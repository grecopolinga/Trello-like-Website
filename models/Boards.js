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
    },
    list: [
        {
            listName: { type: String, required: true },
            cards: {
                cardName: { type: String, required: true },
                cardDesc: { type: String, required: true },
                cardComments: [String],
            },
        },
    ],
});

module.exports = mongoose.model('Board', BoardsSchema);
