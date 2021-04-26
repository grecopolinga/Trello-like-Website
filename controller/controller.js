const Users = require('../models/Users');

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
            const img = user.img;
            res.render('myboards', { layout: 'home', user: username, img });
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
            res.render('favorites', { layout: 'home', user: username, img });
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
};

module.exports = ctrl;
