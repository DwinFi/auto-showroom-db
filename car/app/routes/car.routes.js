module.exports = app => {
  const cars = require("../controllers/car.controller.js");
  const router = require("express").Router();

  // ===== ЛР-12 (ВСЕГДА ВЫШЕ /:id) =====
  router.get("/:id/categoryname", cars.getCarCategoryName);
  router.get("/:id/category", cars.getCarCategory);

  // ===== CRUD =====
  router.post("/", cars.create);
  router.get("/", cars.findAll);
  router.get("/:id", cars.findOne);
  router.put("/:id", cars.update);
  router.delete("/:id", cars.delete);
  router.delete("/", cars.deleteAll);

  app.use("/api/cars", router);
};
