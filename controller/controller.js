const ctrl = {
    getIndex: (req, res) => {
        res.render('index');
    },

    getLogin: (req, res) => {
        res.render('login', { layout: 'login', error: false });
    },
};

module.exports = ctrl;
