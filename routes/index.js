/* Controllers */
const usuarioController = require('../controllers/usuario');
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {


    // app.get('/', (req, res) => res.status(200).send({
    //     message: 'Welcome to the beginning of nothingness.',
    // }));

    // app.use('/bootstrap/js', express.static(__dirname + '/node_modules/jquery/dist'));
    // app.use('/bootstrap/js', express.static(__dirname + '/node_modules/popper.js/dist'));
    // app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
    app.get('/', loginController.index);
    app.get('/registro', registerController.index);
    app.get('/inicio', homeController.index);


    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    }));
    app.post('/api/usuario/create', usuarioController.create);
    app.post('/api/usuario/login', usuarioController.login);
    app.get('/api/usuario/list', usuarioController.list);
    app.get('/api/usuario/find/username/:username', usuarioController.find);


    // app.use("/public", express.static(__dirname + '/../public'));
    // app.use('/src/*', (req, res) => res.sendFile(path.join(__dirname, '/../src/')));
    // app.use('/bootstrap/dist', (req, res) => res.sendFile(path.join(__dirname, '/../node_modules/bootstrap/dist/')));
    // app.use('/bootstrap/dist/css/bootstrap.min.css', (req, res) => res.sendFile(path.join(__dirname, '/../node_modules/bootstrap/dist/css/bootstrap.min.css')));
};