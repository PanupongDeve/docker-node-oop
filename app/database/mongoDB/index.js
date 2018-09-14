const mongoose = require('mongoose');
const config = require('./config.js');

const cat = require('./model/Cat');

const DB_HOST = (process.env.DOCKER === 'yes') ? process.env.DB_HOST_DOCKER : config.DB_HOST;
const DB_NAME = process.env.DB_NAME || config.DB_NAME;
const MONGO_URI = `mongodb://${DB_HOST}:27017/${DB_NAME}`;
const MONGO_CLOUND_URI = config.CLOUND_URI;


class MongoDB {
    constructor() {
        this.MONGO_URI = MONGO_URI;
        this.model = {};
    }

    connectDatabase() {
        mongoose.connect(this.MONGO_URI)
        const DATABASE_Connection = mongoose.connection;

        // if ERROR
        DATABASE_Connection.on('error', console.error.bind(console, 'MONGODB DATABASE ---> STATUS: FAIL'));
        DATABASE_Connection.once('open', () => {
            console.log('MONGODB DATABASE ---> STATUS: OPENING');
        });
    }

    mountModel() {
        this.model.cat = cat;
    }


    async mount() {
        console.log('MONGODB DATABASE MOUNT ---> STATUS: SUCCESS');
        this.mountModel();
        this.connectDatabase();
    }

    

    
}

module.exports = new MongoDB();



