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
        try {
            const board = await Boards.findOne({
                boardName: req.params.boardName,
            });

            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }

            if (req.body.boardName != null) {
                board.boardName = req.body.boardName;
            }
            if (req.body.boardLabel != null) {
                board.boardLabel = req.body.boardLabel;
            }
            if (req.body.boardLists != null) {
                const boardList = req.body.listName
                    .map((item, index) => {
                        if (item != '') {
                            boardList.card = req.body.cards
                                .map((item2, index2) => {
                                    if (item2 != '') {
                                        let object2 = {
                                            cardName: req.body.cardName[index2],
                                            cardDesc: req.body.cards[index2],
                                            cardComments:
                                                req.body.cardComments[index2],
                                        };
                                        return object2;
                                    }
                                })
                                .filter(function (el) {
                                    return el != null;
                                });

                            let object = {
                                listName: req.body.listName[index],
                                cards: boardList.card,
                            };
                            return object;
                        }
                    })
                    .filter(function (el) {
                        return el != null;
                    });

                board.boardLists = boardList;
            }
            const modBoard = await board.save(); // Save modified board
            res.send(modBoard);
        } catch (err) {
            res.status(500).send();
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
