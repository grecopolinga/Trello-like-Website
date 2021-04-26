const express = require('express');
const router = express.Router();
const signupCtrl = require('../controller/signupCtrl');
const signinCtrl = require('../controller/signinCtrl');
// const boardCtrl = require('../controller/boardCtrl');
const userCtrl = require('../controller/userCtrl');
const ctrl = require('../controller/controller');
const findUserBoard = require('../middleware/findUserBoard');
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
router.post('/register', signupCtrl.registerUser);

// @desc  User Boards
// @route GET /:username/favorites
router.get('/:username/boards', findUserBoard, ctrl.userBoards);

// @desc  User Favorites
// @route GET /:username/favorites
router.get('/:username/favorites', findUserBoard, ctrl.userFavorites);

// @desc User Settings
// @route GET /:username/settings
router.get('/:username/settings', findUserBoard, ctrl.userSettings);

router.post('/:username/settings', upload.single('image'), userCtrl.updateUser);

router.delete('/:username/settings', userCtrl.deleteUser);

router.get('/:username/settings/confirm', userCtrl.confirmPassword);

module.exports = router;
