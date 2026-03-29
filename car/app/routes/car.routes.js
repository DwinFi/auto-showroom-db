module.exports = app => {
  const cars = require("../controllers/car.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Cars
   *   description: Car management API
   */

  /**
   * @swagger
   * /api/cars:
   *   get:
   *     summary: Get all cars
   *     tags: [Cars]
   *     responses:
   *       200:
   *         description: List of cars
   */
  router.get("/", cars.findAll);

  /**
   * @swagger
   * /api/cars/{id}:
   *   get:
   *     summary: Get car by ID
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Car found
   *       404:
   *         description: Car not found
   */
  router.get("/:id", cars.findOne);

  /**
   * @swagger
   * /api/cars:
   *   post:
   *     summary: Create a new car
   *     tags: [Cars]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               brand:
   *                 type: string
   *               model:
   *                 type: string
   *               price:
   *                 type: number
   *               category_id:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Car created successfully
   */
  router.post("/", cars.create);

  /**
   * @swagger
   * /api/cars/{id}:
   *   put:
   *     summary: Update car by ID
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: Car updated
   *       404:
   *         description: Car not found
   */
  router.put("/:id", cars.update);

  /**
   * @swagger
   * /api/cars/{id}:
   *   delete:
   *     summary: Delete car by ID
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Car deleted
   */
  router.delete("/:id", cars.delete);

  /**
   * @swagger
   * /api/cars:
   *   delete:
   *     summary: Delete all cars
   *     tags: [Cars]
   *     responses:
   *       200:
   *         description: All cars deleted
   */
  router.delete("/", cars.deleteAll);

  /**
   * @swagger
   * /api/cars/{id}/category:
   *   get:
   *     summary: Get category of a car
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Car category
   */
  router.get("/:id/category", cars.getCarCategory);

  /**
   * @swagger
   * /api/cars/{id}/categoryname:
   *   get:
   *     summary: Get category name of a car
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Car category name
   */
  router.get("/:id/categoryname", cars.getCarCategoryName);

  app.use("/api/cars", router);
};