const express = require('express');
const router = express.Router();
const signupCtrl = require('../controllers/signupCtrl');
const signinCtrl = require('../controllers/signinCtrl');
const boardCtrl = require('../controllers/boardCtrl');
const findUserBoard = require('../middlewares/findUserBoards');
const ctrl = require('../controllers/controller');
const validator = require('../helpers/validator');
const userCtrl = require('../controllers/userCtrl');
const logoutCtrl = require('../controllers/logoutCtrl');
const {
    isUserAuth,
    isUserNotAuth,
    isAuthorized,
} = require('../middlewares/isAuth');
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
router.get('/', isUserAuth, ctrl.getIndex);

// @desc  Login page
// @route GET /login
router.get('/login', isUserAuth, ctrl.getLogin);

// @desc  Login user
// @route POST /login
router.post('/login', isUserAuth, signinCtrl.loginUser);

// @desc  Register User
// @route POST /register
router.post(
    '/register',
    isUserAuth,
    validator.signupValidation(),
    signupCtrl.registerUser
);

router.get('/logout', logoutCtrl.getLogout);

// @desc  User Boards
// @route GET /:username/favorites
router.get('/:username/boards', isUserNotAuth, findUserBoard, ctrl.userBoards);

// @desc  User Favorites
// @route GET /:username/favorites
router.get(
    '/:username/favorites',
    isUserNotAuth,
    findUserBoard,
    ctrl.userFavorites
);

// @desc  User Settings
// @route GET /:username/settings
router.get(
    '/:username/settings',
    isUserNotAuth,
    findUserBoard,
    ctrl.userSettings
);

// @desc  Update User Info
// @route POST /:username/settings
router.post(
    '/:username/settings',
    isUserNotAuth,
    upload.single('image'),
    validator.updateUserValidation(),
    userCtrl.updateUser
);

// @desc  Delete User
// @route DELETE /:username/settings
router.delete('/:username/settings', isUserNotAuth, userCtrl.deleteUser);

// @desc  Confirm User Info Updates
// @route GET /:username/settings/confirm
router.get(
    '/:username/settings/confirm',
    isUserNotAuth,
    userCtrl.confirmPassword
);

// @desc  Check username if it exists
// @route GET /:username/settings/confirm
router.get('/getCheckUser', signupCtrl.getCheckUser);

// @desc Create new board
// @route POST /create
// router.post('/createnewboard', boardCtrl.createBoard);

router.get('/workspace/:id', isAuthorized, ctrl.getWorkspace);

// @desc Update specific board
// @route PATCH /updateboard
// router.patch('/:boardName', boardCtrl.updateBoard);
router.patch(
    '/workspace/:id',
    isAuthorized,
    validator.boardNameValidation(),
    boardCtrl.updateBoardDetails
);

// @desc Delete specific board
// @route Delete /delete
// router.delete('/:boardName', boardCtrl.deleteBoard);
router.delete('/workspace/:id', isAuthorized, boardCtrl.deleteBoard);

router.post(
    '/:username/createBoard',
    isAuthorized,
    validator.boardNameValidation(),
    boardCtrl.createBoard
);

router.post(
    '/workspace/:id/createList',
    isAuthorized,
    boardCtrl.postCreateList
);

router.delete('/workspace/:id/deleteList', isAuthorized, boardCtrl.deleteList);

router.patch(
    '/workspace/:id/updateList',
    isAuthorized,
    boardCtrl.patchUpdateList
);

// @desc Update clicked board
// @route Patch /clicked
router.patch('/:id/clicked', isAuthorized, boardCtrl.confirmFavorite);

// @desc Get search board
// @route GET /search
router.get('/:username/search', isUserNotAuth, ctrl.boardSearch);
// @desc Create card
// @route Create /Create;
router.post(
    '/workspace/:id/:listId/createCard',
    isAuthorized,
    boardCtrl.postCreateCard
);

// @desc Delete card
// @route Delete /delete;
router.delete(
    '/workspace/:id/:listId/deleteCard',
    isAuthorized,
    boardCtrl.deleteCard
);

router.patch(
    '/workspace/:id/:listId/updateCard',
    isAuthorized,
    boardCtrl.patchUpdateCard
);

router.delete(
    '/workspace/:id/:listId/deleteComment',
    isAuthorized,
    boardCtrl.deleteComment
);

router.post(
    '/workspace/:id/:listId/createComment',
    isAuthorized,
    boardCtrl.createComment
);

module.exports = router;
