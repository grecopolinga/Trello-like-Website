const Boards = require('../models/Boards');
const Users = require('../models/Users');
const { validationResult } = require('express-validator');

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
            var errors = validationResult(req);

            if (!errors.isEmpty()) {
                errors = errors.errors;

                var details = {};
                for (let i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;

                res.redirect(`/workspace/${req.params.id}`);
            } else {
                const board = await Boards.findById(req.params.id);
                if (req.body.board_name != null) {
                    board.boardName = req.body.board_name;
                }
                if (req.body.board_label != null) {
                    board.boardLabel = req.body.board_label;
                }
                await board.save();
                res.redirect(`/workspace/${req.params.id}`);
            }
        } catch (err) {
            // console.log(err);
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
            var errors = validationResult(req);

            if (!errors.isEmpty()) {
                errors = errors.errors;

                var details = {};
                for (let i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;

                res.redirect(`/${req.session.userID}/boards`);
            } else {
                const user = await Users.findOne({
                    username: req.params.username,
                });
                const board = new Boards({
                    boardName: req.body.board_name,
                    user: user._id,
                    boardLabel: req.body.board_label,
                    boardLists: [],
                });
                const newBoard = await board.save();
                res.redirect(`/workspace/${newBoard._id}`);
            }
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
            } else {
                board.boardFavorite = 'false';
            }
            console.log(board);
            await board.save();
            res.send(true);
        } catch (err) {
            console.log(err);
        }
    },

    postCreateCard: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            const listIndex = board.boardLists
                .map((item, index) => {
                    if (item._id == req.params.listId) {
                        return index;
                    }
                })
                .filter(function (el) {
                    return el != null;
                });

            if (req.body.cardName != '') {
                board.boardLists[listIndex].cards.push({
                    cardName: req.body.cardName,
                });

                await board.save();
                const listCards = board.boardLists[listIndex].cards;
                const data = {
                    cardName:
                        board.boardLists[listIndex].cards[listCards.length - 1]
                            .cardName,
                    id:
                        board.boardLists[listIndex].cards[listCards.length - 1]
                            ._id,
                };
                res.send(data);
            } else {
                res.send(false);
            }
            console.log(board.boardLists[listIndex].cards); //Testing display
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    },

    deleteCard: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            const listIndex = board.boardLists
                .map((item, index) => {
                    if (item._id == req.params.listId) {
                        return index;
                    }
                })
                .filter(function (el) {
                    return el != null;
                });
            if (board.boardLists[listIndex] != null) {
                board.boardLists[listIndex].cards = board.boardLists[
                    listIndex
                ].cards.filter((v) => v._id.toString() !== req.body.id);
                await board.save();
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    patchUpdateCard: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            const listIndex = board.boardLists
                .map((item, index) => {
                    if (item._id == req.params.listId) {
                        return index;
                    }
                })
                .filter(function (el) {
                    return el != null;
                });
            if (board.boardLists[listIndex] != null) {
                board.boardLists[listIndex].cards.forEach((v) => {
                    if (v._id.toString() === req.body.id) {
                        if (req.body.listName != null) {
                            v.cardName = req.body.listName;
                            console.log(v.cardName); //testing after update
                        }
                        if (req.body.listDesc != null) {
                            v.cardDesc = req.body.listDesc;
                            console.log(v.cardDesc); //testing after update
                        }
                        if (req.body.listComment != null) {
                            v.cardComments.push(req.body.listComment);
                            console.log(v.cardComments); //testing after update
                        }
                    }
                });
                await board.save();
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    deleteComment: async (req, res) => {
        try {
            var listComment = req.body.listComment.slice(0, -1);
            const board = await Boards.findById(req.params.id);
            if (board != null) {
                const list = board.boardLists.find((card) => {
                    if (card._id.toString() === req.body.cardId) {
                        return true;
                    }
                });

                const card = list.cards.find((e) => {
                    if (e._id.toString() === req.body.listId) {
                        return true;
                    }
                });

                //TODO: Better Delation of Multiple Instance of a Comment
                card.cardComments = card.cardComments.filter(
                    (c) => c !== listComment
                );

                await board.save();

                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },

    createComment: async (req, res) => {
        try {
            console.log(req.body);
            const board = await Boards.findById(req.params.id);
            const listIndex = board.boardLists
                .map((item, index) => {
                    if (item._id == req.params.listId) {
                        return index;
                    }
                })
                .filter(function (el) {
                    return el != null;
                });
            const cardIndex = board.boardLists[listIndex].cards
                .map((item, index) => {
                    if (item._id == req.body.id) {
                        return index;
                    }
                })
                .filter(function (el) {
                    return el != null;
                });
            if (board.boardLists[listIndex].cards[cardIndex] != null) {
                board.boardLists[listIndex].cards[cardIndex].cardComments.push(
                    req.body.listComment
                );
                console.log(
                    board.boardLists[listIndex].cards[cardIndex].cardComments
                ); //testing after adding comment
                await board.save();
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            console.log(req.params.listId);
            console.log(err);
            res.status(500).send();
        }
    },
};

module.exports = boardCtrl;
