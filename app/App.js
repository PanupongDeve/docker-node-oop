const express = require('express');
const http = require('http');
const mysql = require('./database/mysql');
const SetUpMiddleware = require('./middlewares/setUpMiddleware');
const MysqlController = require('./controllers/MysqlController');


module.exports = class App {
    constructor(port) {
        this.express = express;
        this.app = this.express();
        this.http = http.Server(this.app);
        this.port = process.env.PORT || port;
    }

    async mountDatabase() {
        await mysql.mount();
    }

    mountMiddleware() {
        SetUpMiddleware.inCludeApp(this.app);
        SetUpMiddleware.mount();
    }

    mountController() {
        MysqlController.inCludeApp(this.app);
        MysqlController.mount();
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