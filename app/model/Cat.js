module.exports = (sequelize, DataTypes) => {
    const cat = sequelize.define('cat', {
        ownerId: DataTypes.UUID,
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


    return cat;
}