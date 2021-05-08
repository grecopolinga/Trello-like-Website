const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const signupCtrl = {
    registerUser: async (req, res) => {
        try {
            var errors = validationResult(req);

            if (!errors.isEmpty()) {
                errors = errors.errors;

                var details = {};
                for (let i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;

                res.render('login', details);
            } else {
                const hashedPassword = await bcrypt.hash(
                    req.body.reg_password,
                    10
                );
                const user = new Users({
                    fName: req.body.firstname,
                    lName: req.body.lastname,
                    username: req.body.reg_username,
                    email: req.body.email,
                    password: hashedPassword,
                    img: 'default.png',
                });
                const newUser = await user.save();
                req.session.userID = user.username;
                res.redirect(`/${newUser.username}/boards`);
            }
        } catch (err) {
            res.redirect('/login');
        }
    },

    getCheckUser: async (req, res) => {
        try {
            console.log(req.query.username);
            const user = await Users.findOne({ username: req.query.username });
            if (user == null) {
                res.send(true);
            } else {
                res.send(false);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },
};

module.exports = signupCtrl;
