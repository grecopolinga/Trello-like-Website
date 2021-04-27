const Boards = require('../models/Boards');

async function findUserBoards(req, res, next) {
    let board;
    try {
        board = await Boards.find({ username: req.params.username });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
    res.board = board;
    next();
}

module.exports = findUserBoards;
