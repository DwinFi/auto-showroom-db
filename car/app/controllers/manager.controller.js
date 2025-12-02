const db = require("../models");
const Manager = db.managers;
const Op = db.Sequelize.Op;

// Создание и сохранение нового менеджера
exports.create = (req, res) => {
    if (!req.body.fullName || !req.body.phone) {
        res.status(400).send({
            message: "Содержимое не может быть пустым! Поля fullName и phone обязательны."
        });
        return;
    }

    const manager = {
        fullName: req.body.fullName,
        phone: req.body.phone
    };

    Manager.create(manager)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании менеджера."
            });
        });
};

// Получение всех менеджеров из базы данных
exports.findAll = (req, res) => {
    const fullName = req.query.fullName;
    var condition = fullName ? { fullName: { [Op.like]: `%${fullName}%` } } : null;

    Manager.findAll({ 
        where: condition,
        include: ["orders"]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при получении менеджеров."
        });
    });
};

// Найти одного менеджера по идентификатору
exports.findOne = (req, res) => {
    const id = req.params.id;

    Manager.findByPk(id, { include: ["orders"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Не найден менеджер с id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при получении менеджера с id=" + id
            });
        });
};

// Обновление менеджера по идентификатору в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    Manager.update(req.body, {
        where: { managerCode: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Менеджер был успешно обновлен."
                });
            } else {
                res.send({
                    message: `Невозможно обновить менеджера с id=${id}. Возможно, менеджер не найден или req.body пуст!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при обновлении менеджера с id=" + id
            });
        });
};

// Удаление менеджера с указанным идентификатором в запросе
exports.delete = (req, res) => {
    const id = req.params.id;

    Manager.destroy({
        where: { managerCode: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Менеджер был успешно удален!"
                });
            } else {
                res.send({
                    message: `Невозможно удалить менеджера с id=${id}. Возможно, менеджер не найден!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Не удалось удалить менеджера с id=" + id
            });
        });
};

// Удаление всех менеджеров из базы данных
exports.deleteAll = (req, res) => {
    Manager.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} менеджеров были успешно удалены!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при удалении всех менеджеров."
            });
        });
};