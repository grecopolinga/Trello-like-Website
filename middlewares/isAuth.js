const isAuth = {
    isUserAuth: (req, res, next) => {
        if (req.session.userID != null) {
            res.redirect(`/${req.session.userID}/boards`);
        } else {
            next();
        }
    },
    isUserNotAuth: (req, res, next) => {
        if (req.session.userID != null) {
            if (req.session.userID !== req.params.username) {
                res.redirect(`/${req.session.userID}/boards`);
            } else {
                next();
            }
        } else {
            res.redirect('/');
        }
    },
    isAuthorized: (req, res, next) => {
        if (req.session.userID != null) {
            next();
        } else {
            res.redirect('/');
        }
    },
};

module.exports = isAuth;
