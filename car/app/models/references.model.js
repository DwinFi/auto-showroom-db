module.exports = function(db) {
    // R1: Категория может включать подкатегории (самосвязь)
    db.categories.belongsTo(db.categories, { 
        as: 'baseCategory',
        foreignKey: 'baseCategoryCode' 
    });
    db.categories.hasMany(db.categories, { 
        as: 'subCategories',
        foreignKey: 'baseCategoryCode' 
    });

    // R2: Категория включает автомобили (1:N)
    db.categories.hasMany(db.cars, {
        foreignKey: 'categoryCode'
    });
    db.cars.belongsTo(db.categories, {
        foreignKey: 'categoryCode'
    });

    // R3: Автомобиль фигурирует в позициях заказа (1:N)
    db.cars.hasMany(db.orderitems, {
        foreignKey: 'carCode'
    });
    db.orderitems.belongsTo(db.cars, {
        foreignKey: 'carCode'
    });

    // R4: Клиент оформляет заказы (1:N)
    db.clients.hasMany(db.orders, {
        foreignKey: 'clientCode'
    });
    db.orders.belongsTo(db.clients, {
        foreignKey: 'clientCode'
    });

    // R5: Менеджер оформляет заказы (1:N)
    db.managers.hasMany(db.orders, {
        foreignKey: 'managerCode'
    });
    db.orders.belongsTo(db.managers, {
        foreignKey: 'managerCode'
    });

    // R6: Заказ состоит из позиций заказа (1:N)
    db.orders.hasMany(db.orderitems, {
        foreignKey: 'orderNumber'
    });
    db.orderitems.belongsTo(db.orders, {
        foreignKey: 'orderNumber'
    });
};