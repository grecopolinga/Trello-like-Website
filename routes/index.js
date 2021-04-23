const express = require('express');
const router = express.Router();
const signupCtrl = require('../controller/signupCtrl');
const signinCtrl = require('../controller/signinCtrl');
const ctrl = require('../controller/controller');

// @desc Landing page
// @route GET /
router.get('/', ctrl.getIndex);

// @desc Login page
// @route GET /login
router.get('/login', ctrl.getLogin);

// @desc Login user
// @route POST /login
router.post('/login', signinCtrl.loginUser);

// @desc Register User
// @route POST /register
router.post('/register', signupCtrl.registerUser);

module.exports = router;
