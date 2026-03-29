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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - salePrice
     *               - orderNumber
     *               - motorcycleCode
     *             properties:
     *               salePrice:
     *                 type: number
     *               orderNumber:
     *                 type: integer
     *               motorcycleCode:
     *                 type: integer
     *     responses:
     *       201:
     *         description: Order item created
     */
    router.post("/", orderitems.create);

    /**
     * @swagger
     * /api/orderitems:
     *   get:
     *     summary: Get all order items
     *     tags: [OrderItems]
     *     responses:
     *       200:
     *         description: List of order items
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
     *     responses:
     *       200:
     *         description: Order item found
     *       404:
     *         description: Order item not found
     */
    router.get("/:id", orderitems.findOne);

    /**
     * @swagger
     * /api/orderitems/{id}:
     *   put:
     *     summary: Update order item by ID
     *     tags: [OrderItems]
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
     *               salePrice:
     *                 type: number
     *               orderNumber:
     *                 type: integer
     *               motorcycleCode:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Order item updated
     */
    router.put("/:id", orderitems.update);

    /**
     * @swagger
     * /api/orderitems/{id}:
     *   delete:
     *     summary: Delete order item by ID
     *     tags: [OrderItems]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Order item deleted
     */
    router.delete("/:id", orderitems.delete);

    /**
     * @swagger
     * /api/orderitems:
     *   delete:
     *     summary: Delete all order items
     *     tags: [OrderItems]
     *     responses:
     *       200:
     *         description: All order items deleted
     */
    router.delete("/", orderitems.deleteAll);

    app.use('/api/orderitems', router);
};