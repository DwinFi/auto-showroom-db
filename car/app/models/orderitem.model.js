module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("orderitem", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salePrice: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        carCode: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        orderNumber: {
            type: Sequelize.INTEGER,
            allowNull: true
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
        tableName: 'orderitems',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
        underscored: false
    });
    return OrderItem;
};