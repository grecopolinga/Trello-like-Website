const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const signupCtrl = {
    registerUser: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.reg_password, 10);
            const user = new Users({
                fName: req.body.firstname,
                lName: req.body.lastname,
                username: req.body.reg_username,
                email: req.body.email,
                password: hashedPassword,
                img: 'default.png',
            });
            const newUser = await user.save();
            res.redirect(`/${newUser.username}/boards`);
        } catch (err) {
            res.redirect('/login');
        }
    },
};

module.exports = signupCtrl;
