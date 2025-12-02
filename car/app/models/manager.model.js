module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define("manager", {
        managerCode: {
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
        tableName: 'managers',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
        underscored: false
    });
    return Manager;
};