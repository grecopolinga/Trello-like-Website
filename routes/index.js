const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const users = [];
// Landing page
router.get('/', (req, res) => {
    res.render('index');
});

// Login page
router.get('/login', (req, res) => {
    res.render('login', { layout: 'login', error: false });
});

// Login
router.post('/login', async (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
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
            res.send('Success');
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
});

// Register
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.reg_password, 10);
        users.push({
            id: uuid.v4(),
            name: req.body.firstname + ' ' + req.body.lastname,
            username: req.body.reg_username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.send(users);
    } catch (err) {
        res.redirect('/login');
    }
});

module.exports = router;
