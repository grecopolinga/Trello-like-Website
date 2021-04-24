const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const userCtrl = {
    // update user info
    updateUser: async (req, res) => {
        const user = await Users.findOne({ username: req.params.username });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            if (req.body.fName != null) {
                user.fName = req.body.fName;
            }
            if (req.body.lName != null) {
                user.lName = req.body.lName;
            }
            if (req.body.password != null) {
                user.password = hashedPassword;
            }
            if (req.body.email != null) {
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
};

module.exports = userCtrl;
