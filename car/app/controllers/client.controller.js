const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Создание и сохранение нового клиента
exports.create = (req, res) => {
    if (!req.body.fullName || !req.body.phone) {
        res.status(400).send({
            message: "Содержимое не может быть пустым! Поля fullName и phone обязательны."
        });
        return;
    }

    const client = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        passportData: req.body.passportData
    };

    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании клиента."
            });
        });
};

// Получение всех клиентов из базы данных
exports.findAll = (req, res) => {
    const fullName = req.query.fullName;
    var condition = fullName ? { fullName: { [Op.like]: `%${fullName}%` } } : null;

    Client.findAll({ 
        where: condition,
        include: ["orders"]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при получении клиентов."
        });
    });
};

// Найти одного клиента по идентификатору
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id, { include: ["orders"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Не найден клиент с id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при получении клиента с id=" + id
            });
        });
};

// Обновление клиента по идентификатору в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: { clientCode: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Клиент был успешно обновлен."
                });
            } else {
                res.send({
                    message: `Невозможно обновить клиент с id=${id}. Возможно, клиент не найден или req.body пуст!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при обновлении клиента с id=" + id
            });
        });
};

// Удаление клиента с указанным идентификатором в запросе
exports.delete = (req, res) => {
    const id = req.params.id;

    Client.destroy({
        where: { clientCode: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Клиент был успешно удален!"
                });
            } else {
                res.send({
                    message: `Невозможно удалить клиент с id=${id}. Возможно, клиент не найден!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Не удалось удалить клиент с id=" + id
            });
        });
};

// Удаление всех клиентов из базы данных
exports.deleteAll = (req, res) => {
    Client.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} клиентов были успешно удалены!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при удалении всех клиентов."
            });
        });
};