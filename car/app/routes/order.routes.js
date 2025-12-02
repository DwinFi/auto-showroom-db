module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    var router = require("express").Router();

    // Создать новый заказ
    router.post("/", orders.create);

    // Получить все заказы
    router.get("/", orders.findAll);

    // Получить один заказ по id
    router.get("/:id", orders.findOne);

    // Обновить заказ по id
    router.put("/:id", orders.update);

    // Удалить заказ по id
    router.delete("/:id", orders.delete);

    // Удалить все заказы
    router.delete("/", orders.deleteAll);

    app.use('/api/orders', router);
};