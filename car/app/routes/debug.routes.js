module.exports = app => {
  const debug = require("../controllers/debug.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Debug
   *   description: Debug endpoints
   */

  /**
   * @swagger
   * /api/debug/db:
   *   get:
   *     summary: Get current connected database
   *     tags: [Debug]
   *     responses:
   *       200:
   *         description: Current database name
   */
  router.get("/db", debug.getCurrentDatabase);

  app.use("/api/debug", router);
};