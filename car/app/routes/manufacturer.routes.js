module.exports = app => {
  const manufacturers = require("../controllers/manufacturer.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Manufacturers
   *   description: Manufacturer management API
   */

  /**
   * @swagger
   * /api/manufacturers:
   *   post:
   *     summary: Create a new manufacturer
   *     tags: [Manufacturers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               country:
   *                 type: string
   *     responses:
   *       201:
   *         description: Manufacturer created
   */
  router.post("/", manufacturers.create);

  /**
   * @swagger
   * /api/manufacturers:
   *   get:
   *     summary: Get all manufacturers
   *     tags: [Manufacturers]
   *     responses:
   *       200:
   *         description: List of manufacturers
   */
  router.get("/", manufacturers.findAll);

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   get:
   *     summary: Get manufacturer by ID
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Manufacturer found
   *       404:
   *         description: Manufacturer not found
   */
  router.get("/:id", manufacturers.findOne);

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   put:
   *     summary: Update manufacturer by ID
   *     tags: [Manufacturers]
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
   *               name:
   *                 type: string
   *               country:
   *                 type: string
   *     responses:
   *       200:
   *         description: Manufacturer updated
   */
  router.put("/:id", manufacturers.update);

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   delete:
   *     summary: Delete manufacturer by ID
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Manufacturer deleted
   */
  router.delete("/:id", manufacturers.delete);

  app.use("/api/manufacturers", router);
};