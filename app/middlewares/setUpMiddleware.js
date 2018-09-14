const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

class SetupMiddleware {
    constructor() {
        this.app = null;
    }

    inCludeApp(app) {
        this.app = app;
    }

    middleware() {
        this.app.use(cors());

        this.app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 400 }
          }));
        this.app.use(morgan('common', {
            stream: fs.createWriteStream(path.join(__dirname, `access.log`), {flags: 'a'})
          }))
        
        //use static folder
        this.app.use(express.static('public'));
        //config urlencode
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));

        this.app.use(compression());
    }

    mount() {
        console.log('MIDDLEWARE MOUNT ---> STATUS: SUCCESS');
        this.middleware();
    }
}

module.exports = new SetupMiddleware();