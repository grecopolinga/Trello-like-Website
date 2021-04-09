const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = [];

// Middlewares

//Render Login Page
router.get('/', (req, res) => {
    res.render('login', { layout: 'login', error: false });
});

//Login and Register User
//TODO: Improve Authentication
router.post('/', async (req, res) => {
    console.log(req.body);
    if (req.body.form_type === 'log') {
        const user = users.find((user) => user.username === req.body.username);
        console.log(user);
        if (user == null) {
            return res.render('login', {
                layout: 'login',
                error: true,
                msg: 'Username not found',
            });
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send('Success');
            } else {
                res.render('login', {
                    layout: 'login',
                    error: true,
                    msg: 'Incorrect Password',
                });
            }
        } catch (err) {
            res.status(500).send();
        }
    } else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.reg_password, 10);
            users.push({
                id: Date.now().toString(),
                name: req.body.firstname + ' ' + req.body.lastname,
                username: req.body.reg_username,
                email: req.body.email,
                password: hashedPassword,
            });
            res.send(users);
        } catch (err) {
            res.redirect('/login');
        }
    }
});

module.exports = router;
