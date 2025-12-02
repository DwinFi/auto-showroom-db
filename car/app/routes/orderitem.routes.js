module.exports = app => {
    const orderitems = require("../controllers/orderitem.controller.js");
    var router = require("express").Router();

    // Создать новую позицию заказа
    router.post("/", orderitems.create);

    // Получить все позиции заказа
    router.get("/", orderitems.findAll);

    // Получить одну позицию заказа по id
    router.get("/:id", orderitems.findOne);

    // Обновить позицию заказа по id
    router.put("/:id", orderitems.update);

    // Удалить позицию заказа по id
    router.delete("/:id", orderitems.delete);

    // Удалить все позиции заказа
    router.delete("/", orderitems.deleteAll);

    app.use('/api/orderitems', router);
};