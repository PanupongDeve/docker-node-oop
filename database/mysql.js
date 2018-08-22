
const Sequelize = require('sequelize');


class Mysql {
    constructor() {
        this.Sequelize = Sequelize;
        this.sequelize = this.setupDatabase();
        this.model = this.mountModel(this.sequelize, this.Sequelize);     
    }

    setupDatabase() {
        const database = process.env.DB_NAME;
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
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

    async mountModel(sequelize, DataTypes) {
        const model = {};
        model.user = require('../model/User')(sequelize, DataTypes);
        model.owner = require('../model/Owner')(sequelize, DataTypes);
        model.cat = require('../model/Cat')(sequelize, DataTypes);

        await this.mountSync(model);
        await this.mountRelation(model);
    
        return model
        
    }

    async mountSync(model) {
        /**
         * ทำการสร้าง database
         * model.owner.sync({force: true}); --> สร้างดาต้าเบสอันใหม่โดยลบข้อมูลออกหมด
         */
        
        await model.user.sync();
        await model.owner.sync();
        await model.cat.sync();
        
    }

    async mountRelation(model) {
        /**
         * กำหนด relation
         * 
         */
        model.owner.hasMany(model.cat);
    }

    
}

module.exports = new Mysql();



