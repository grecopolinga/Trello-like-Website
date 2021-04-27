//import mongoose
const mongoose = require('mongoose');

const BoardsSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    boardLabel: {
        type: String,
        required: false,
    },
    boardFavorite: {
        type: Boolean,
        default: false,
    },
    boardLists: [
        {
            listName: { type: String, required: true },
            cards: [
                {
                    cardName: { type: String, required: true },
                    cardDesc: { type: String, required: false },
                    cardComments: [String],
                },
            ],
            required: false,
        },
    ],
});

module.exports = mongoose.model('Board', BoardsSchema);
