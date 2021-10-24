const path = require('path');
const Sequelize = require('sequelize');
const inventario = require('../models').inventario;

module.exports = {
    index(req, res) {
        session = req.session;
        if (session.loggedin) {
            res.sendFile(path.join(__dirname, '/../views/inventory/index.html'));
        } else {
            res.redirect('/');
        }
        // res.status(200).send({
        //     message: 'Welcome to the beginning of nothingness.',
        // })
    },
    create(req, res) {
        // res.send('welcome, ' + req.body.username);
        return inventario
            .create({
                usurioid: req.body.usurioid,
                nombre: req.body.nombre,
                sku: req.body.sku,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                status: req.body.status
            })
            .then(function (inventario) {
                res.status(200).send(inventario);
            })
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return inventario.findAll({})
            .then(inventario => res.status(200).send(inventario))
            .catch(error => res.status(400).send(error))
    },
}