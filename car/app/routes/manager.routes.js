module.exports = app => {
    const managers = require("../controllers/manager.controller.js");
    const router = require("express").Router();

    /**
     * @swagger
     * tags:
     *   name: Managers
     *   description: Manager management API
     */

    /**
     * @swagger
     * /api/managers:
     *   post:
     *     summary: Create a new manager
     *     tags: [Managers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               fullName:
     *                 type: string
     *               phone:
     *                 type: string
     *     responses:
     *       201:
     *         description: Manager created
     */
    router.post("/", managers.create);

    /**
     * @swagger
     * /api/managers:
     *   get:
     *     summary: Get all managers
     *     tags: [Managers]
     *     responses:
     *       200:
     *         description: List of managers
     */
    router.get("/", managers.findAll);

    /**
     * @swagger
     * /api/managers/{id}:
     *   get:
     *     summary: Get manager by ID
     *     tags: [Managers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Manager found
     *       404:
     *         description: Manager not found
     */
    router.get("/:id", managers.findOne);

    /**
     * @swagger
     * /api/managers/{id}:
     *   put:
     *     summary: Update manager by ID
     *     tags: [Managers]
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
     *               fullName:
     *                 type: string
     *               phone:
     *                 type: string
     *     responses:
     *       200:
     *         description: Manager updated
     */
    router.put("/:id", managers.update);

    /**
     * @swagger
     * /api/managers/{id}:
     *   delete:
     *     summary: Delete manager by ID
     *     tags: [Managers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Manager deleted
     */
    router.delete("/:id", managers.delete);

    /**
     * @swagger
     * /api/managers:
     *   delete:
     *     summary: Delete all managers
     *     tags: [Managers]
     *     responses:
     *       200:
     *         description: All managers deleted
     */
    router.delete("/", managers.deleteAll);

    app.use('/api/managers', router);
};