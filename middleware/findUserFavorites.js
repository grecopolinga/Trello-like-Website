const Boards = require('../models/Boards');

//retrieve all favorite boards
async function findUserFavorites(req, res, next) {
    let boards;
    try {
        boards = await Boards.find({}).select('boardFavorite');
        boards.exec((err, boardFavorite) => {
            if (boardFavorite) {
                res.json(boardFavorite);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}
