const db = require("../models");

exports.getCurrentDatabase = async (req, res) => {
  const [result] = await db.sequelize.query("SELECT current_database()");
  res.json(result[0]);
};
