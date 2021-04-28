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
            const boards = await Boards.find({ user: user._id });
            // console.log(boards);
            const img = user.img;
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
            const boards = await Boards.find({ boardFavorite: true });
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
                board,
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    userSearch: async (req, res) => {
        try {
            const user = await Users.findOne({
                username: req.params.username,
            });
            const username = user.username;
            const img = user.img;
            const boards = await Boards.find({
                boardName: new RegExp(`^${req.params.boardName}$`, 'i'),
            });
            console.log(boards); // check if board name matched
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
};

module.exports = ctrl;
