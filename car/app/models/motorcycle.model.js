module.exports = (sequelize, Sequelize) => {
    const Motorcycle = sequelize.define("motorcycle", {
        motorcycleCode: { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },

        vin: { 
            type: Sequelize.STRING(17), 
            allowNull: false, 
            unique: true,
            validate: {
                len: [17, 17]
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

        // 🔥 НОВОЕ ПОЛЕ
        engine_capacity: { 
            type: Sequelize.INTEGER, 
            allowNull: false,
            comment: "Объем двигателя (в куб. см)"
        },

        // FK на категории
        categoryCode: { 
            type: Sequelize.INTEGER, 
            allowNull: true
        },

        // 🔥 НОВОЕ (7 сущность)
        manufacturerCode: { 
            type: Sequelize.INTEGER, 
            allowNull: true
        }

    }, { 
        tableName: 'motorcycles', 
        timestamps: false,
        freezeTableName: true,
        underscored: false
    });
    
    return Motorcycle;
};