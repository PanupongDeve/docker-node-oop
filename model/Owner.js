const cat = require('./Cat');


module.exports = (sequelize, DataTypes) => {
    const owner = sequelize.define('owner', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        }
    
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    

    return owner
}