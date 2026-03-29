module.exports = (sequelize, Sequelize) => {
    const Manufacturer = sequelize.define("manufacturer", {
        manufacturerCode: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        country: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        tableName: 'manufacturers',
        timestamps: false,
        freezeTableName: true,
        underscored: false
    });

    return Manufacturer;
};