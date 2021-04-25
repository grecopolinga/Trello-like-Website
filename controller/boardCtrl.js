const Boards = require('../models/Boards');

const boardCtrl = {
    //retrieve one board
    getBoard: async (req, res) => {
        try {
            const board = await Boards.findOne({
                boardName: req.params.boardName,
            });
            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }
            res.json(board);
        } catch (err) {
            res.status(500).send();
        }
    },

    //retrieve all boards
    getBoards: async (req, res) => {
        try {
            const boards = await Boards.find();
            // console.log(boards);
            res.json(boards);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    // update specific board
    updateBoard: async (req, res) => {
        const board = await Boards.findOne({ boardName: req.params.boardName });
        try {
            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }
            if (req.body.boardName != null) {
                board.boardName = req.body.boardName;
            }
            if (req.body.boardLabel != null) {
                board.boardLabel = req.body.boardLabel;
            }
            if (req.body.boardFavorite != null) {
                board.boardFavorite = req.body.boardFavorite;
            }
            if (req.body.boardLists != null) {
                board.boardLists = req.body.boardLists;
            }
            const modBoard = await board.save(); // Save modified board
            res.send(modBoard);
        } catch (err) {
            console.log(err);
            res.status(400).send();
        }
    },

    // delete specific board
    deleteBoard: async (req, res) => {
        try {
            const board = await Boards.findOne({
                boardName: req.params.boardName,
            });
            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }
            await Boards.remove(board);
            res.send({ msg: 'Board deleted' });
        } catch (err) {
            res.status(500).send();
        }
    },

    // create board
    createBoard: async (req, res) => {
        try {
            const board = new Boards({
                boardName: req.body.boardName,
                boardLabel: req.body.boardLabel,
                boardLists: req.body.boardLists,
            });
            const newBoard = await board.save();
            // await board.save();
            res.send(newBoard);
        } catch (err) {
            // console.log(err);
            res.redirect('/boards');
        }
    },
};

module.exports = boardCtrl;
