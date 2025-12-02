const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Создание и сохранение новой категории
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Содержимое не может быть пустым! Поле name обязательно."
        });
        return;
    }

    const category = {
        name: req.body.name,
        baseCategoryCode: req.body.baseCategoryCode
    };

    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании категории."
            });
        });
};

// Получение всех категорий из базы данных
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Category.findAll({ 
        where: condition,
        include: [
            {
                model: Category,
                as: 'baseCategory'
            },
            {
                model: Category,
                as: 'subCategories'
            }
        ]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при получении категорий."
        });
    });
};

// Найти одну категорию по идентификатору
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id, {
        include: [
            {
                model: Category,
                as: 'baseCategory'
            },
            {
                model: Category,
                as: 'subCategories'
            }
        ]
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Не найдена категория с id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ошибка при получении категории с id=" + id
        });
    });
};

// Обновление категории по идентификатору в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { categoryCode: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Категория была успешно обновлена."
            });
        } else {
            res.send({
                message: `Невозможно обновить категорию с id=${id}. Возможно, категория не найдена или req.body пуст!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ошибка при обновлении категории с id=" + id
        });
    });
};

// Удаление категории с указанным идентификатором в запросе
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { categoryCode: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Категория была успешно удалена!"
            });
        } else {
            res.send({
                message: `Невозможно удалить категорию с id=${id}. Возможно, категория не найдена!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Не удалось удалить категорию с id=" + id
        });
    });
};

// Удаление всех категорий из базы данных
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} категорий были успешно удалены!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при удалении всех категорий."
        });
    });
};