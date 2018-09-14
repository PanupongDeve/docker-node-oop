const express = require('express');
const http = require('http');
const SetUpMiddleware = require('./middlewares/setUpMiddleware');
const mongodb = require('./database/mongoDB');
const MongoDbController = require('./controllers/MongoDbController');


module.exports = class App {
    constructor(port) {
        this.express = express;
        this.app = this.express();
        this.http = http.Server(this.app);
        this.port = process.env.PORT || port;
    }

    async mountDatabase() {
        await mongodb.mount();
    }

    mountMiddleware() {
        SetUpMiddleware.inCludeApp(this.app);
        SetUpMiddleware.mount();
    }

    mountController() {
        MongoDbController.inCludeApp(this.app);
        MongoDbController.mount();
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