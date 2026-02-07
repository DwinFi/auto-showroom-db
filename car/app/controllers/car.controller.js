const db = require("../models");
const Car = db.cars;
const Category = db.categories;
const sequelize = db.sequelize;
const { QueryTypes } = db.Sequelize;

// ================= CRUD =================

exports.create = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const carCode = req.params.id;
    const car = await Car.findByPk(carCode);

    if (!car) {
      return res.status(404).json({ message: "Автомобиль не найден" });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const carCode = req.params.id;

    const result = await Car.update(req.body, {
      where: { carCode }
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Автомобиль не найден" });
    }

    res.json({ message: "Автомобиль обновлён" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const carCode = req.params.id;

    const result = await Car.destroy({
      where: { carCode }
    });

    if (!result) {
      return res.status(404).json({ message: "Автомобиль не найден" });
    }

    res.json({ message: "Автомобиль удалён" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Car.destroy({ where: {}, truncate: true });
    res.json({ message: "Все автомобили удалены" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ЛР-12 =================

// 🔹 RAW SQL — название категории
exports.getCarCategoryName = async (req, res) => {
  try {
    const carCode = req.params.id;

    const result = await sequelize.query(
      `
      SELECT c.name
      FROM categories c
      JOIN cars a ON a."categoryCode" = c."categoryCode"
      WHERE a."carCode" = :carCode
      `,
      {
        replacements: { carCode },
        type: QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Категория для данного автомобиля не найдена"
      });
    }

    res.json({ categoryName: result[0].name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Sequelize — объект категории
exports.getCarCategory = async (req, res) => {
  try {
    const carCode = req.params.id;

    const car = await Car.findByPk(carCode, {
      include: {
        model: Category,
        attributes: ["categoryCode", "name"]
      }
    });

    if (!car || !car.category) {
      return res.status(404).json({
        message: "Категория для данного автомобиля не найдена"
      });
    }

    res.json(car.category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
