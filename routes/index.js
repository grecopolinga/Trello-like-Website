const express = require('express');
const router = express.Router();
const signupCtrl = require('../controller/signupCtrl');
const signinCtrl = require('../controller/signinCtrl');
const boardCtrl = require('../controller/boardCtrl');
const findUserBoard = require('../middleware/findUserBoards');
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

// @desc Retrieve all boards
// @route GET /myboards
router.get('/myboards', boardCtrl.getBoards);

// @desc Retrieve all favorites
// @route GET /myfavorites
router.get('/myfavorites', boardCtrl.getBoards);

// @desc Get specific board
// @route GET /:boardName
router.get('/:boardName', boardCtrl.getBoard);

// @desc Create new board
// @route POST /create
router.post('/createnewboard', boardCtrl.createBoard);

// @desc Update specific board
// @route PATCH /updateboard
router.patch('/:boardName', boardCtrl.updateBoard);

// @desc Delete specific board
// @route Delete /delete
router.delete('/:boardName', boardCtrl.deleteBoard);

// @desc Get userboards
// @route GET /:username/boards
router.get('/:username/boards', findUserBoard, (req, res) => {
    res.json(res.board);
});

module.exports = router;
