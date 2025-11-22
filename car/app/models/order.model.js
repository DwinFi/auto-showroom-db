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
        }
    }, {
        tableName: 'orders',
        timestamps: true
    });
    return Order;
};