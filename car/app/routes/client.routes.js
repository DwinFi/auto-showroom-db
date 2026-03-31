module.exports = app => {
    const clients = require("../controllers/client.controller.js");
    const router = require("express").Router();

    /**
     * @swagger
     * tags:
     *   name: Clients
     *   description: Client management API
     */

    /**
     * @swagger
     * /api/clients:
     *   post:
     *     summary: Create a new client
     *     tags: [Clients]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - fullName
     *               - phone
     *             properties:
     *               fullName:
     *                 type: string
     *               phone:
     *                 type: string
     *               passportData:
     *                 type: string
     *     responses:
     *       201:
     *         description: Client created
     */
    router.post("/", clients.create);

    /**
     * @swagger
     * /api/clients:
     *   get:
     *     summary: Get all clients
     *     tags: [Clients]
     *     responses:
     *       200:
     *         description: List of clients
     */
    router.get("/", clients.findAll);

    /**
     * @swagger
     * /api/clients/{id}:
     *   get:
     *     summary: Get client by ID
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Client found
     *       404:
     *         description: Client not found
     */
    router.get("/:id", clients.findOne);

    /**
     * @swagger
     * /api/clients/{id}:
     *   put:
     *     summary: Update client by ID
     *     tags: [Clients]
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
     *               passportData:
     *                 type: string
     *     responses:
     *       200:
     *         description: Client updated
     */
    router.put("/:id", clients.update);

    /**
     * @swagger
     * /api/clients/{id}:
     *   delete:
     *     summary: Delete client by ID
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Client deleted
     */
    router.delete("/:id", clients.delete);

    /**
     * @swagger
     * /api/clients:
     *   delete:
     *     summary: Delete all clients
     *     tags: [Clients]
     *     responses:
     *       200:
     *         description: All clients deleted
     */
    router.delete("/", clients.deleteAll);

    app.use('/api/clients', router);
};