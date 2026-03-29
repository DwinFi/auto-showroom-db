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
     */
    router.post("/", managers.create);

    /**
     * @swagger
     * /api/managers:
     *   get:
     *     summary: Get all managers
     *     tags: [Managers]
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
     */
    router.get("/:id", managers.findOne);

    /**
     * @swagger
     * /api/managers/{id}:
     *   put:
     *     summary: Update manager by ID
     *     tags: [Managers]
     */
    router.put("/:id", managers.update);

    /**
     * @swagger
     * /api/managers/{id}:
     *   delete:
     *     summary: Delete manager by ID
     *     tags: [Managers]
     */
    router.delete("/:id", managers.delete);

    /**
     * @swagger
     * /api/managers:
     *   delete:
     *     summary: Delete all managers
     *     tags: [Managers]
     */
    router.delete("/", managers.deleteAll);

    app.use('/api/managers', router);
};