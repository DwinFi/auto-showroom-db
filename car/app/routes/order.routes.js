module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    const router = require("express").Router();

    /**
     * @swagger
     * tags:
     *   name: Orders
     *   description: Order management API
     */

    /**
     * @swagger
     * /api/orders:
     *   post:
     *     summary: Create a new order
     *     tags: [Orders]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               orderDate:
     *                 type: string
     *               status:
     *                 type: string
     *               clientCode:
     *                 type: integer
     *               managerCode:
     *                 type: integer
     *     responses:
     *       201:
     *         description: Order created
     */
    router.post("/", orders.create);

    /**
     * @swagger
     * /api/orders:
     *   get:
     *     summary: Get all orders
     *     tags: [Orders]
     *     responses:
     *       200:
     *         description: List of orders
     */
    router.get("/", orders.findAll);

    /**
     * @swagger
     * /api/orders/{id}:
     *   get:
     *     summary: Get order by ID
     *     tags: [Orders]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Order found
     *       404:
     *         description: Order not found
     */
    router.get("/:id", orders.findOne);

    /**
     * @swagger
     * /api/orders/{id}:
     *   put:
     *     summary: Update order by ID
     *     tags: [Orders]
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
     *               orderDate:
     *                 type: string
     *               status:
     *                 type: string
     *               clientCode:
     *                 type: integer
     *               managerCode:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Order updated
     */
    router.put("/:id", orders.update);

    /**
     * @swagger
     * /api/orders/{id}:
     *   delete:
     *     summary: Delete order by ID
     *     tags: [Orders]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Order deleted
     */
    router.delete("/:id", orders.delete);

    /**
     * @swagger
     * /api/orders:
     *   delete:
     *     summary: Delete all orders
     *     tags: [Orders]
     *     responses:
     *       200:
     *         description: All orders deleted
     */
    router.delete("/", orders.deleteAll);

    app.use('/api/orders', router);
};