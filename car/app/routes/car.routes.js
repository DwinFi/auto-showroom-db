module.exports = app => {
    const cars = require("../controllers/car.controller.js");
    var router = require("express").Router();

    // Создать новый автомобиль
    router.post("/", cars.create);

    // Получить все автомобили
    router.get("/", cars.findAll);

    // Получить один автомобиль по id
    router.get("/:id", cars.findOne);

    // Обновить автомобиль по id
    router.put("/:id", cars.update);

    // Удалить автомобиль по id
    router.delete("/:id", cars.delete);

    // Удалить все автомобили
    router.delete("/", cars.deleteAll);

    app.use('/api/cars', router);
};