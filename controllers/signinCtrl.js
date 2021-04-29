const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const signinCtrl = {
    loginUser: async (req, res) => {
        const user = await Users.findOne({ username: req.body.username });
        console.log(user);
        if (user == null) {
            return res.render('login', {
                layout: 'login',
                error: true,
                msg: 'Incorrect Username/Password',
            });
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.redirect(`/${user.username}/boards`);
            } else {
                res.render('login', {
                    layout: 'login',
                    error: true,
                    msg: 'Incorrect Username/Password',
                });
            }
        } catch (err) {
            res.status(500).send();
        }
    },
};

module.exports = signinCtrl;
