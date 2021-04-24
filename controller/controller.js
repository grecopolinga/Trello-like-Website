const Users = require('../models/Users');

const ctrl = {
    getIndex: (req, res) => {
        res.render('index');
    },

    getLogin: (req, res) => {
        res.render('login', { layout: 'login', error: false });
    },

    userBoards: (req, res) => {
        const user = req.params.username;
        res.render('myboards', { layout: 'home', user: user });
    },

    userFavorites: (req, res) => {
        const user = req.params.username;
        res.render('favorites', { layout: 'home', user: user });
    },

    userSettings: async (req, res) => {
        try {
            const user = await Users.findOne({ username: req.params.username });
            const details = {
                fName: user.fName,
                lName: user.lName,
                email: user.email,
            };
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
