const Sequelize = require('sequelize');
const usuario = require('../models').usuario;
var session;

module.exports = {
    create(req, res) {
        // res.send('welcome, ' + req.body.username);
        return usuario
            .create({
                username: req.body.username,
                mail: req.body.mail,
                password: req.body.password,
                status: req.body.status
            })
            .then(function(usuario) {
                session = req.session;
                session.loggedin = true;
                // req.session.username = username;
                res.status(200).send(usuario);
            })
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return usuario.findAll({})
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        return usuario
            .findAll({
                where: {
                    username: req.params.username
                }
            })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },
    login(req, res) {
        return usuario
            .findAll({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then(function(usuario) {
                session = req.session;
                session.loggedin = true;
                res.status(200).send(usuario);
            })
            .catch(error => res.status(400).send(error))
    },
};