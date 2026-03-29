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

    // R2: Категория включает мотоциклы (1:N)
    db.categories.hasMany(db.motorcycles, {
        foreignKey: 'categoryCode',
        as: 'motorcycles'
    });

    db.motorcycles.belongsTo(db.categories, {
        foreignKey: 'categoryCode',
        as: 'category'
    });

    // R3: Производитель выпускает мотоциклы (1:N)
    db.manufacturers.hasMany(db.motorcycles, {
        foreignKey: 'manufacturerCode',
        as: 'motorcycles'
    });

    db.motorcycles.belongsTo(db.manufacturers, {
        foreignKey: 'manufacturerCode',
        as: 'manufacturer'
    });

    // R4: Мотоцикл фигурирует в позициях заказа (1:N)
    db.motorcycles.hasMany(db.orderitems, {
        foreignKey: 'motorcycleCode',
        as: 'orderitems'
    });

    db.orderitems.belongsTo(db.motorcycles, {
        foreignKey: 'motorcycleCode',
        as: 'motorcycle'
    });

    // R5: Клиент оформляет заказы (1:N)
    db.clients.hasMany(db.orders, {
        foreignKey: 'clientCode',
        as: 'orders'
    });

    db.orders.belongsTo(db.clients, {
        foreignKey: 'clientCode',
        as: 'client'
    });

    // R6: Менеджер оформляет заказы (1:N)
    db.managers.hasMany(db.orders, {
        foreignKey: 'managerCode',
        as: 'orders'
    });

    db.orders.belongsTo(db.managers, {
        foreignKey: 'managerCode',
        as: 'manager'
    });

    // R7: Заказ состоит из позиций заказа (1:N)
    db.orders.hasMany(db.orderitems, {
        foreignKey: 'orderNumber',
        as: 'orderitems'
    });

    db.orderitems.belongsTo(db.orders, {
        foreignKey: 'orderNumber',
        as: 'order'
    });
};