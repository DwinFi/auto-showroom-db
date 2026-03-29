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
     */
    router.post("/", orders.create);

    /**
     * @swagger
     * /api/orders:
     *   get:
     *     summary: Get all orders
     *     tags: [Orders]
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
     */
    router.get("/:id", orders.findOne);

    /**
     * @swagger
     * /api/orders/{id}:
     *   put:
     *     summary: Update order by ID
     *     tags: [Orders]
     */
    router.put("/:id", orders.update);

    /**
     * @swagger
     * /api/orders/{id}:
     *   delete:
     *     summary: Delete order by ID
     *     tags: [Orders]
     */
    router.delete("/:id", orders.delete);

    /**
     * @swagger
     * /api/orders:
     *   delete:
     *     summary: Delete all orders
     *     tags: [Orders]
     */
    router.delete("/", orders.deleteAll);

    app.use('/api/orders', router);
};