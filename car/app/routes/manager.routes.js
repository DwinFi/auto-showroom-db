module.exports = app => {
    const managers = require("../controllers/manager.controller.js");
    var router = require("express").Router();

    // Создать нового менеджера
    router.post("/", managers.create);

    // Получить всех менеджеров
    router.get("/", managers.findAll);

    // Получить одного менеджера по id
    router.get("/:id", managers.findOne);

    // Обновить менеджера по id
    router.put("/:id", managers.update);

    // Удалить менеджера по id
    router.delete("/:id", managers.delete);

    // Удалить всех менеджеров
    router.delete("/", managers.deleteAll);

    app.use('/api/managers', router);
};