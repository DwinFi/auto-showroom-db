module.exports = app => {
  const motorcycles = require("../controllers/motorcycle.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Motorcycles
   *   description: Motorcycle management API
   */

  /**
   * @swagger
   * /api/motorcycles:
   *   get:
   *     summary: Get all motorcycles
   *     tags: [Motorcycles]
   *     responses:
   *       200:
   *         description: List of motorcycles
   */
  router.get("/", motorcycles.findAll);

  /**
   * @swagger
   * /api/motorcycles/{id}:
   *   get:
   *     summary: Get motorcycle by ID
   *     tags: [Motorcycles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Motorcycle found
   *       404:
   *         description: Motorcycle not found
   */
  router.get("/:id", motorcycles.findOne);

  /**
   * @swagger
   * /api/motorcycles:
   *   post:
   *     summary: Create a new motorcycle
   *     tags: [Motorcycles]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - vin
   *               - brand
   *               - model
   *               - year
   *               - color
   *               - condition
   *               - purchasePrice
   *               - engine_capacity
   *             properties:
   *               vin:
   *                 type: string
   *               brand:
   *                 type: string
   *               model:
   *                 type: string
   *               year:
   *                 type: integer
   *               color:
   *                 type: string
   *               condition:
   *                 type: string
   *               purchasePrice:
   *                 type: number
   *               engine_capacity:
   *                 type: integer
   *               categoryCode:
   *                 type: integer
   *               manufacturerCode:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Motorcycle created
   */
  router.post("/", motorcycles.create);

  /**
   * @swagger
   * /api/motorcycles/{id}:
   *   put:
   *     summary: Update motorcycle by ID
   *     tags: [Motorcycles]
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
   *             properties:
   *               vin:
   *                 type: string
   *               brand:
   *                 type: string
   *               model:
   *                 type: string
   *               year:
   *                 type: integer
   *               color:
   *                 type: string
   *               condition:
   *                 type: string
   *               purchasePrice:
   *                 type: number
   *               engine_capacity:
   *                 type: integer
   *               categoryCode:
   *                 type: integer
   *               manufacturerCode:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Motorcycle updated
   */
  router.put("/:id", motorcycles.update);

  /**
   * @swagger
   * /api/motorcycles/{id}:
   *   delete:
   *     summary: Delete motorcycle by ID
   *     tags: [Motorcycles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Motorcycle deleted
   */
  router.delete("/:id", motorcycles.delete);

  /**
   * @swagger
   * /api/motorcycles:
   *   delete:
   *     summary: Delete all motorcycles
   *     tags: [Motorcycles]
   *     responses:
   *       200:
   *         description: All motorcycles deleted
   */
  router.delete("/", motorcycles.deleteAll);

  /**
   * @swagger
   * /api/motorcycles/{id}/category:
   *   get:
   *     summary: Get category of a motorcycle
   *     tags: [Motorcycles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Motorcycle category
   */
  router.get("/:id/category", motorcycles.getMotorcycleCategory);

  /**
   * @swagger
   * /api/motorcycles/{id}/categoryname:
   *   get:
   *     summary: Get category name of a motorcycle
   *     tags: [Motorcycles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Motorcycle category name
   */
  router.get("/:id/categoryname", motorcycles.getMotorcycleCategoryName);

  app.use("/api/motorcycles", router);
};