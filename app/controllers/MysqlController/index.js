
const AuthController = require('./AuthController');
const HomeController = require('./HomeController');
const CatsController = require('./CatsController');
const OwnerController = require('./OwnerController');

class MysqlController {
    constructor() {
        this.app = null;
    }

    inCludeApp(app) {
        this.app = app;
    }

    mount() {
        this.app.use('/', HomeController);
        this.app.use('/auth', AuthController);
        this.app.use('/api/cats', CatsController);
        this.app.use('/api/owners', OwnerController);
    }
}


module.exports = new MysqlController();
