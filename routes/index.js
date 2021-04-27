const express = require('express');
const router = express.Router();
const signupCtrl = require('../controller/signupCtrl');
const signinCtrl = require('../controller/signinCtrl');
const boardCtrl = require('../controller/boardCtrl');
const findUserBoard = require('../middleware/findUserBoards');
const ctrl = require('../controller/controller');
const validator = require('../helpers/validator');
const userCtrl = require('../controller/userCtrl');
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

// @desc Retrieve all boards
// @route GET /myboards
router.get('/myboards', boardCtrl.getBoards);

// @desc Get specific board
// @route GET /:boardName
router.get('/:boardName', boardCtrl.getBoard);

// @desc Create new board
// @route POST /create
router.post('/createnewboard', boardCtrl.createBoard);

// @desc Update specific board
// @route PATCH /updateboard
// router.patch('/:boardName', boardCtrl.updateBoard);
router.patch('/workspace/:id', boardCtrl.updateBoardDetails);

// @desc Delete specific board
// @route Delete /delete
// router.delete('/:boardName', boardCtrl.deleteBoard);
router.delete('/workspace/:id', boardCtrl.deleteBoard);

// @desc Get userboards
// @route GET /:username/boards
router.get('/:username/boards', findUserBoard, (req, res) => {
    res.json(res.board);
});

router.post('/:username/createBoard', boardCtrl.createBoard);

router.get('/workspace/:id', ctrl.getWorkspace);

module.exports = router;
