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
            unique: true,
            validate: {
                len: [17, 17]  // VIN должен быть ровно 17 символов
            }
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
            allowNull: false,
            validate: {
                min: 1900,
                max: new Date().getFullYear() + 1
            }
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
            allowNull: false,
            validate: {
                min: 0
            }
        },
        categoryCode: { 
            type: Sequelize.INTEGER, 
            allowNull: true  // Важно: allowNull: true, а не false!
        }
    }, { 
        tableName: 'cars', 
        timestamps: false,
        // Добавьте эти настройки для совместимости
        freezeTableName: true,
        underscored: false
    });
    
    return Car;
};