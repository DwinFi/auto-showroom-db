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
        }
    }, {
        tableName: 'managers',
        timestamps: true
    });
    return Manager;
};