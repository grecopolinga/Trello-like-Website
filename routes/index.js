const express = require('express');
const router = express.Router();

// Landing page
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'login' });
});

module.exports = router;
