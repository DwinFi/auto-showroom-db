const db = require("../models");
const Motorcycle = db.motorcycles;
const Category = db.categories;
const Manufacturer = db.manufacturers;
const sequelize = db.sequelize;
const { QueryTypes } = db.Sequelize;

// ================= CRUD =================

exports.create = async (req, res) => {
  try {
    const motorcycleData = { ...req.body };

    // Если указан manufacturerCode — автоматически подставляем brand
    if (motorcycleData.manufacturerCode) {
      const manufacturer = await Manufacturer.findByPk(motorcycleData.manufacturerCode);

      if (!manufacturer) {
        return res.status(404).json({
          message: "Производитель с указанным manufacturerCode не найден"
        });
      }

      motorcycleData.brand = manufacturer.name;
    }

    const motorcycle = await Motorcycle.create(motorcycleData);
    res.status(201).json(motorcycle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll();
    res.json(motorcycles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const motorcycleCode = req.params.id;
    const motorcycle = await Motorcycle.findByPk(motorcycleCode);

    if (!motorcycle) {
      return res.status(404).json({ message: "Мотоцикл не найден" });
    }

    res.json(motorcycle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const motorcycleCode = req.params.id;
    const updateData = { ...req.body };

    // Если в обновлении указан manufacturerCode — автоматически обновляем brand
    if (updateData.manufacturerCode) {
      const manufacturer = await Manufacturer.findByPk(updateData.manufacturerCode);

      if (!manufacturer) {
        return res.status(404).json({
          message: "Производитель с указанным manufacturerCode не найден"
        });
      }

      updateData.brand = manufacturer.name;
    }

    const result = await Motorcycle.update(updateData, {
      where: { motorcycleCode }
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Мотоцикл не найден" });
    }

    res.json({ message: "Мотоцикл обновлён" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const motorcycleCode = req.params.id;

    const result = await Motorcycle.destroy({
      where: { motorcycleCode }
    });

    if (!result) {
      return res.status(404).json({ message: "Мотоцикл не найден" });
    }

    res.json({ message: "Мотоцикл удалён" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Motorcycle.destroy({ where: {}, truncate: true });
    res.json({ message: "Все мотоциклы удалены" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= Запросы категории =================

// RAW SQL — название категории мотоцикла
exports.getMotorcycleCategoryName = async (req, res) => {
  try {
    const motorcycleCode = req.params.id;

    const result = await sequelize.query(
      `
      SELECT c.name
      FROM categories c
      JOIN motorcycles m ON m."categoryCode" = c."categoryCode"
      WHERE m."motorcycleCode" = :motorcycleCode
      `,
      {
        replacements: { motorcycleCode },
        type: QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Категория для данного мотоцикла не найдена"
      });
    }

    res.json({ categoryName: result[0].name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Sequelize — объект категории
exports.getMotorcycleCategory = async (req, res) => {
  try {
    const motorcycleCode = req.params.id;

    const motorcycle = await Motorcycle.findByPk(motorcycleCode, {
      include: {
        model: Category,
        as: "category",
        attributes: ["categoryCode", "name"]
      }
    });

    if (!motorcycle || !motorcycle.category) {
      return res.status(404).json({
        message: "Категория для данного мотоцикла не найдена"
      });
    }

    res.json(motorcycle.category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};