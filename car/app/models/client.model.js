module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        clientCode: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        passportData: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'createdAt'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'updatedAt'
        }
    }, {
        tableName: 'clients',
        timestamps: true,  // Sequelize будет автоматически управлять полями
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
        underscored: false
    });
    return Client;
};