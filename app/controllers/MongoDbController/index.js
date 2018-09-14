const HomeController = require('./HomeController.js');
const CatsController = require('./CatsController.js');

class MongoDbController {
    constructor() {
        this.app = null;
    }

    inCludeApp(app) {
        this.app = app;
    }

    mount() {
        console.log('MYSQL CONTROLLER MOUNT ---> STATUS: SUCCESS');
        this.app.use('/', HomeController);
        this.app.use('/cats', CatsController);
    }
}


module.exports = new MongoDbController();
