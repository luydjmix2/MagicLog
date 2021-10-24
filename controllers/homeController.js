const path = require('path');

module.exports = {
    index(req, res) {
        session = req.session;
        if (session.loggedin) {
            res.sendFile(path.join(__dirname, '/../views/home/index.html'));
        } else {
            res.redirect('/');
        }

        // path.join(__dirname, 'src/views/login/index');
        // res.status(200).send({
        //     message: 'Welcome to the beginning of nothingness.',
        // })
    },
}