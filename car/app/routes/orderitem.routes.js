module.exports = app => {
    const orderitems = require("../controllers/orderitem.controller.js");
    const router = require("express").Router();

    /**
     * @swagger
     * tags:
     *   name: OrderItems
     *   description: Order item management API
     */

    /**
     * @swagger
     * /api/orderitems:
     *   post:
     *     summary: Create a new order item
     *     tags: [OrderItems]
     */
    router.post("/", orderitems.create);

    /**
     * @swagger
     * /api/orderitems:
     *   get:
     *     summary: Get all order items
     *     tags: [OrderItems]
     */
    router.get("/", orderitems.findAll);

    /**
     * @swagger
     * /api/orderitems/{id}:
     *   get:
     *     summary: Get order item by ID
     *     tags: [OrderItems]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     */
    router.get("/:id", orderitems.findOne);

    /**
     * @swagger
     * /api/orderitems/{id}:
     *   put:
     *     summary: Update order item by ID
     *     tags: [OrderItems]
     */
    router.put("/:id", orderitems.update);

    /**
     * @swagger
     * /api/orderitems/{id}:
     *   delete:
     *     summary: Delete order item by ID
     *     tags: [OrderItems]
     */
    router.delete("/:id", orderitems.delete);

    /**
     * @swagger
     * /api/orderitems:
     *   delete:
     *     summary: Delete all order items
     *     tags: [OrderItems]
     */
    router.delete("/", orderitems.deleteAll);

    app.use('/api/orderitems', router);
};