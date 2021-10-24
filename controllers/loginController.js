const path = require('path');

module.exports = {
    index(req, res) {
        session = req.session;
        if (session.loggedin) {
            res.redirect('/inicio');
        } else {
            res.sendFile(path.join(__dirname, '/../views/login/index.html'));
        }

        // path.join(__dirname, 'src/views/login/index');
        // res.status(200).send({
        //     message: 'Welcome to the beginning of nothingness.',
        // })
    },
}