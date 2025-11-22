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
        }
    }, {
        tableName: 'clients',
        timestamps: true
    });
    return Client;
};