module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    const router = require("express").Router();

    /**
     * @swagger
     * tags:
     *   name: Categories
     *   description: Category management API
     */

    /**
     * @swagger
     * /api/categories:
     *   post:
     *     summary: Create a new category
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       201:
     *         description: Category created
     */
    router.post("/", categories.create);

    /**
     * @swagger
     * /api/categories:
     *   get:
     *     summary: Get all categories
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: List of categories
     */
    router.get("/", categories.findAll);

    /**
     * @swagger
     * /api/categories/{id}:
     *   get:
     *     summary: Get category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Category found
     *       404:
     *         description: Category not found
     */
    router.get("/:id", categories.findOne);

    /**
     * @swagger
     * /api/categories/{id}:
     *   put:
     *     summary: Update category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *     responses:
     *       200:
     *         description: Category updated
     */
    router.put("/:id", categories.update);

    /**
     * @swagger
     * /api/categories/{id}:
     *   delete:
     *     summary: Delete category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Category deleted
     */
    router.delete("/:id", categories.delete);

    /**
     * @swagger
     * /api/categories:
     *   delete:
     *     summary: Delete all categories
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: All categories deleted
     */
    router.delete("/", categories.deleteAll);

    app.use('/api/categories', router);
};