
const Sequelize = require('sequelize');


class Mysql {
    constructor() {
        this.Sequelize = Sequelize;
        this.sequelize = this.setupDatabase();
        this.model = this.mountModel(this.sequelize, this.Sequelize);
        
    }

    setupDatabase() {
        const database = process.env.DB_NAME;
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        const host = (process.env.DOCKER === 'yes') ? process.env.DB_HOST_DOCKER : process.env.DB_HOST;
        

        const sequelize = new this.Sequelize(database, username, password, {
                host,
                dialect: 'mysql',
                operatorsAliases: false,
                timezone: 'Asia/Bangkok',
                port: 3306,
                pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });


        return sequelize;
    }

    async testDB() {
        this.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
          });
    }

    mountModel(sequelize, DataTypes) {
        const model = {};
        model.cats = require('../model/Cat')(sequelize, DataTypes);
        return model;
    }

    
}

module.exports = new Mysql();



