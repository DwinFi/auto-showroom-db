const db = require("../models");
const Manufacturer = db.manufacturers;

// Создать
exports.create = async (req, res) => {
  try {
    const data = await Manufacturer.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить все
exports.findAll = async (req, res) => {
  try {
    const data = await Manufacturer.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить один
exports.findOne = async (req, res) => {
  try {
    const data = await Manufacturer.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Производитель не найден" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Обновить
exports.update = async (req, res) => {
  try {
    const result = await Manufacturer.update(req.body, {
      where: { manufacturerCode: req.params.id }
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Производитель не найден" });
    }

    res.json({ message: "Производитель обновлён" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Удалить
exports.delete = async (req, res) => {
  try {
    const result = await Manufacturer.destroy({
      where: { manufacturerCode: req.params.id }
    });

    if (!result) {
      return res.status(404).json({ message: "Производитель не найден" });
    }

    res.json({ message: "Производитель удалён" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};