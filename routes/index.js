const express = require('express');
const router = express.Router();
const signupCtrl = require('../controller/signupCtrl');
const signinCtrl = require('../controller/signinCtrl');
// const boardCtrl = require('../controller/boardCtrl');
const userCtrl = require('../controller/userCtrl');
const ctrl = require('../controller/controller');
const findUserBoard = require('../middleware/findUserBoard');
const validator = require('../helpers/validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.username + 'profile.png');
    },
});

const upload = multer({ storage: storage });

// @desc  Landing page
// @route GET /
router.get('/', ctrl.getIndex);

// @desc  Login page
// @route GET /login
router.get('/login', ctrl.getLogin);

// @desc  Login user
// @route POST /login
router.post('/login', signinCtrl.loginUser);

// @desc  Register User
// @route POST /register
router.post('/register', validator.signupValidation(), signupCtrl.registerUser);

// @desc  User Boards
// @route GET /:username/favorites
router.get('/:username/boards', findUserBoard, ctrl.userBoards);

// @desc  User Favorites
// @route GET /:username/favorites
router.get('/:username/favorites', findUserBoard, ctrl.userFavorites);

// @desc  User Settings
// @route GET /:username/settings
router.get('/:username/settings', findUserBoard, ctrl.userSettings);

// @desc  Update User Info
// @route POST /:username/settings
router.post('/:username/settings', upload.single('image'), userCtrl.updateUser);

// @desc  Delete User
// @route DELETE /:username/settings
router.delete('/:username/settings', userCtrl.deleteUser);

// @desc  Confirm User Info Updates
// @route GET /:username/settings/confirm
router.get('/:username/settings/confirm', userCtrl.confirmPassword);

// @desc  Check username if it exists
// @route GET /:username/settings/confirm
router.get('/getCheckUser', signupCtrl.getCheckUser);

module.exports = router;
