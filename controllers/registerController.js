const path = require('path');

module.exports = {
    index(req, res) {
        res.sendFile(path.join(__dirname, '/../views/register/index.html'));
        // res.status(200).send({
        //     message: 'Welcome to the beginning of nothingness.',
        // })
    },
}