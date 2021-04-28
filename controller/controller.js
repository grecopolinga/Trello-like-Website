const Users = require('../models/Users');
const Boards = require('../models/Boards');

const ctrl = {
    getIndex: (req, res) => {
        res.render('index');
    },

    getLogin: (req, res) => {
        res.render('login', { layout: 'login', error: false });
    },

    userBoards: async (req, res) => {
        try {
            const user = await Users.findOne({
                username: req.params.username,
            });
            const username = user.username;
            var boards = await Boards.find({ user: user._id });
            const img = user.img;
            boards = boards.map((board) => board.toObject());
            res.render('myboards', {
                layout: 'home',
                user: username,
                img,
                boards,
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    userFavorites: async (req, res) => {
        try {
            const user = await Users.findOne({
                username: req.params.username,
            });
            const username = user.username;
            const img = user.img;
            const boards = await Boards.find({
                user: user._id,
                boardFavorite: true,
            });
            // console.log(boards);
            res.render('favorites', {
                layout: 'home',
                user: username,
                img,
                boards,
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    userSettings: async (req, res) => {
        try {
            const user = await Users.findOne({ username: req.params.username });
            const details = {
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                img: user.img,
            };
            console.log(user.img);
            const options = { layout: 'home', user: user.username };
            res.render('settings', {
                ...options,
                ...details,
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    getWorkspace: async (req, res) => {
        try {
            const board = await Boards.findById(req.params.id);
            const user = await Users.findById(board.user);

            res.render('workspace', {
                layout: 'workspace',
                user: user.username,
                board: board.toObject(),
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    boardSearch: async (req, res) => {
        try {
            const user = await Users.findOne({
                username: req.params.username,
            });
            const username = user.username;
            const img = user.img;
            const boards = await Boards.find({
                user: user._id,
                boardName: new RegExp(req.query.boardname, 'i'),
            });
            res.render('searchboards', {
                layout: 'home',
                user: username,
                img,
                boards,
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
};

module.exports = ctrl;
