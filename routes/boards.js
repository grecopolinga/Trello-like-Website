const express = require('express');
const router = express.Router();
const boardCtrl = require('../controller/boardCtrl');

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
router.patch('/:boardName', boardCtrl.updateBoard);

module.exports = router;
