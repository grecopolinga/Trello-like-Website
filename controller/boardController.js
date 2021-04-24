const Boards = require('../models/Boards');

const boardCtrl = {
    getBoard: async (req, res) => {
        //retrieve one board
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

    getBoards: async (req, res) => {
        //retrieve all boards
        try {
            const boards = await Boards.find();
            console.log(boards);
            //res.render(`users`, { users: users });
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    updateBoard: async (req, res) => {
        const board = await Boards.findOne({ boardName: req.params.boardName });
        try {
            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }

            if (req.body.boardName != null) {
                board.password = req.body.boardName;
            }
            const modBoard = await board.save(); // Save modified board
            res.send(modBoard);
        } catch (err) {
            res.status(400).send();
        }
    },

    deleteBoard: async (req, res) => {
        try {
            const board = await Boards.findOne({
                boardName: req.params.boardName,
            });
            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }
            const delBoard = await Boards.remove(board);
            res.send(delBoard);
        } catch (err) {
            res.status(500).send();
        }
    },

    createBoard: async (req, res) => {
        try {
            const board = new Boards({
                boardName: req.body.boardName,
            });
            await board.save();
            // res.redirect();
        } catch (err) {
            res.redirect('/boards');
        }
    },
};

module.exports = boardCtrl;
