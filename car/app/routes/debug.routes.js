module.exports = app => {
  const debug = require("../controllers/debug.controller");
  const router = require("express").Router();

  router.get("/db", debug.getCurrentDatabase);

  app.use("/api/debug", router);
};