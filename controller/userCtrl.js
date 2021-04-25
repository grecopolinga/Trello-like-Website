const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const userCtrl = {
    // update user info
    updateUser: async (req, res) => {
        const user = await Users.findOne({ username: req.params.username });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            if (req.body.fName !== '') {
                user.fName = req.body.fName;
            }
            if (req.body.lName !== '') {
                user.lName = req.body.lName;
            }
            if (req.body.password !== '') {
                user.password = hashedPassword;
            }
            if (req.body.email !== '') {
                user.email = req.body.email;
            }
            await user.save();
            res.redirect(`/${user.username}/settings`);
        } catch (err) {
            res.status(400).send();
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findOneAndRemove({
                username: req.params.username,
            });
            res.redirect('/login');
        } catch (err) {
            res.status(500).send();
        }
    },
    confirmPassword: async (req, res) => {
        try {
            const user = await Users.findOne({ username: req.params.username });
            if (await bcrypt.compare(req.query.cPassword, user.password)) {
                console.log('Success');
                res.send(true);
            } else {
                console.log('Auth Failed');
                res.send(false);
            }
        } catch (err) {
            res.status(500).send();
        }
    },
};

module.exports = userCtrl;
