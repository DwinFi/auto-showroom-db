//Заказ
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        orderNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        paymentDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Оформлен'
        },
        clientCode: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        managerCode: {
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
        tableName: 'orders',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
        underscored: false
    });
    return Order;
};