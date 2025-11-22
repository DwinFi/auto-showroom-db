module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
        carCode: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vin: {
            type: Sequelize.STRING(17),
            allowNull: false,
            unique: true
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        },
        condition: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Новый"
        },
        purchasePrice: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        categoryCode: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'cars',
        timestamps: true
    });
    return Car;
};