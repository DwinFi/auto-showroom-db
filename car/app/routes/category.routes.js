module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    var router = require("express").Router();

    // Создать новую категорию
    router.post("/", categories.create);

    // Получить все категории
    router.get("/", categories.findAll);

    // Получить одну категорию по id
    router.get("/:id", categories.findOne);

    // Обновить категорию по id
    router.put("/:id", categories.update);

    // Удалить категорию по id
    router.delete("/:id", categories.delete);

    // Удалить все категории
    router.delete("/", categories.deleteAll);

    app.use('/api/categories', router);
};