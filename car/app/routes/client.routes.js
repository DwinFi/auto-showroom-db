module.exports = app => {
    const clients = require("../controllers/client.controller.js");
    var router = require("express").Router();

    // Создать нового клиента
    router.post("/", clients.create);

    // Получить всех клиентов
    router.get("/", clients.findAll);

    // Получить одного клиента по id
    router.get("/:id", clients.findOne);

    // Обновить клиента по id
    router.put("/:id", clients.update);

    // Удалить клиента по id
    router.delete("/:id", clients.delete);

    // Удалить всех клиентов
    router.delete("/", clients.deleteAll);

    app.use('/api/clients', router);
};