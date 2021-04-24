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
            console.log(boards);
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
                board.boardLabel = req.body.boardName;
            }
            if (req.body.boardFavorite != null) {
                board.boardFavorite = req.body.boardName;
            }
            if (req.body.boardLists != null) {
                if (req.body.boardLists.listname != null) {
                    board.boardLists.listname = req.body.boardLists.listname;
                }
                if (req.body.boardLists.cards != null) {
                    board.boardLists.cards.cardName =
                        req.body.boardLists.cards.cardName;
                    board.boardLists.cards.cardDesc =
                        req.body.boardLists.cards.cardDesc;
                    board.boardLists.cards.comments =
                        req.body.boardLists.cards.comments;
                }
            }
            const modBoard = await board.save(); // Save modified board
            res.send(modBoard);
        } catch (err) {
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
            });
            await board.save();
            res.json(board);
        } catch (err) {
            res.redirect('/boards');
        }
    },
};

module.exports = boardCtrl;
