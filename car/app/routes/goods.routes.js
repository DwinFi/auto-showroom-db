module.exports = app => {
  const goods = require("../controllers/goods.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Goods
   *   description: Goods management
   */

  /**
   * @swagger
   * /api/goods:
   *   get:
   *     summary: Get all goods
   *     tags: [Goods]
   *     responses:
   *       200:
   *         description: List of goods
   */
  router.get("/", goods.findAll);

  /**
   * @swagger
   * /api/goods:
   *   post:
   *     summary: Create a new good
   *     tags: [Goods]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               price:
   *                 type: number
   *     responses:
   *       201:
   *         description: Good created successfully
   */
  router.post("/", goods.create);

  /**
   * @swagger
   * /api/goods/{id}:
   *   get:
   *     summary: Get good by ID
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Good found
   *       404:
   *         description: Good not found
   */
  router.get("/:id", goods.findOne);

  app.use("/api/goods", router);
};