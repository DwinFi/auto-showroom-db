module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("orderitem", {
        salePrice: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'orderitems',
        timestamps: true
    });
    return OrderItem;
};