module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING
        },
        passwordHash: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }
        
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })


    return user;
}