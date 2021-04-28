const Boards = require('../models/Boards');
const Users = require('../models/Users');

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
                const boardList = req.body.boardLists
                    .map((item, index) => {
                        if (item != null) {
                            //Mapping Cards array
                            if (req.body.boardLists[index].cards != null) {
                                //Modifies cards
                                const card = req.body.boardLists[index].cards
                                    .map((item2, index2) => {
                                        if (item2 != null) {
                                            let object2 = {
                                                //Temporary card object
                                                cardName:
                                                    req.body.boardLists[index]
                                                        .cards[index2].cardName,
                                                cardDesc:
                                                    req.body.boardLists[index]
                                                        .cards[index2].cardDesc,
                                                cardComments:
                                                    req.body.boardLists[index]
                                                        .cards[index2]
                                                        .cardComments,
                                            };
                                            return object2;
                                        }
                                    })
                                    .filter(function (el) {
                                        return el != null;
                                    });

                                let object = {
                                    //Temporary list object if both cards and list name are edited
                                    listName:
                                        req.body.boardLists[index].listName,
                                    cards: card,
                                };
                                return object;
                            } else if (
                                //Modifies the list's name only
                                req.body.boardLists[index].cards == null
                            ) {
                                let object = {
                                    //Temporary list object if list name is only edited
                                    listName:
                                        req.body.boardLists[index].listName,
                                    cards: board.boardLists[index].cards,
                                };
                                return object;
                            }
                        }
                    })
                    .filter(function (el) {
                        return el != null;
                    });

                board.boardLists = boardList; //Save new boardList object
            }
            const modBoard = await board.save(); //Save modified board
            res.send(modBoard);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    // update board details
    updateBoardDetails: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            if (req.body.board_name != null) {
                board.boardName = req.body.board_name;
            }
            if (req.body.board_label != null) {
                board.boardLabel = req.body.board_label;
            }
            await board.save();
            res.redirect(`/workspace/${req.params.id}`);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    // delete specific board
    deleteBoard: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            const user = await Users.findById(board.user);

            if (board == null) {
                return res.status(404).json({ msg: 'Board does not exist' });
            }
            await Boards.remove(board);
            res.redirect(`/${user.username}/boards`);
        } catch (err) {
            res.status(500).send();
        }
    },

    // create board
    createBoard: async (req, res) => {
        try {
            const user = await Users.findOne({ username: req.params.username });
            const board = new Boards({
                boardName: req.body.board_name,
                user: user._id,
                boardLabel: req.body.board_label,
                boardLists: [],
            });
            const newBoard = await board.save();
            res.redirect(`/workspace/${newBoard._id}`);
        } catch (err) {
            // console.log(err);
            res.redirect('/boards');
        }
    },

    postCreateList: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            if (req.body.listName !== '') {
                board.boardLists.push({
                    listName: req.body.listName,
                    cards: [],
                });
                await board.save();
                const boardLists = board.boardLists;
                const data = {
                    listName: req.body.listName,
                    id: board.boardLists[boardLists.length - 1]._id,
                };
                res.send(data);
            } else {
                res.send(false);
            }
        } catch (error) {
            res.status(500).send();
        }
    },

    deleteList: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            if (board != null) {
                board.boardLists = board.boardLists.filter(
                    (v) => v._id.toString() !== req.body.id
                );
                await board.save();
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            res.status(500).send();
        }
    },

    patchUpdateList: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            if (board != null) {
                board.boardLists.forEach((v) => {
                    if (v._id.toString() === req.body.id) {
                        v.listName = req.body.listName;
                    }
                });
                await board.save();
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            res.status(500).send();
        }
    },
    // updates the board if favorite or not
    confirmFavorite: async (req, res) => {
        try {
            const board = await Boards.findOne({ _id: req.params.id });
            if (board.boardFavorite != true) {
                board.boardFavorite = 'true';
                res.send(true);
            } else {
                board.boardFavorite = 'false';
                res.send(false);
            }
            console.log(board);
            await board.save();
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = boardCtrl;
