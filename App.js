const express = require('express');
const http = require('http');

const mysql = require('./database/mysql');

const SetUpMiddleware = require('./middlewares/setUpMiddleware');

const AuthController = require('./controllers/AuthController');
const HomeController = require('./controllers/HomeController');
const CatsController = require('./controllers/CatsController');
const OwnerController = require('./controllers/OwnerController');


module.exports = class App {
    constructor(port) {
        this.express = express;
        this.app = this.express();
        this.http = http.Server(this.app);
        this.port = process.env.PORT || port;
    }

    async mountDatabase() {
        await mysql.testDB();
    }

    mountMiddleware() {
        SetUpMiddleware.inCludeApp(this.app);
        SetUpMiddleware.mount();
    }

    mountController() {
        this.app.use('/', HomeController);
        this.app.use('/auth', AuthController);
        this.app.use('/api/cats', CatsController);
        this.app.use('/api/owners', OwnerController);
    }

    async start() {
        await this.mountMiddleware();
        await this.mountDatabase();
        await this.mountController();
        this.http.listen(this.port, () => {
            console.log(`Server start at ${this.port}`);
        })
    }
}