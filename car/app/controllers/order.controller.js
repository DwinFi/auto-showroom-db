const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Создание и сохранение нового заказа
exports.create = (req, res) => {
    if (!req.body.orderDate || !req.body.clientCode || !req.body.managerCode) {
        res.status(400).send({
            message: "Содержимое не может быть пустым! Поля orderDate, clientCode и managerCode обязательны."
        });
        return;
    }

    const order = {
        orderDate: req.body.orderDate,
        paymentDate: req.body.paymentDate,
        status: req.body.status,
        clientCode: req.body.clientCode,
        managerCode: req.body.managerCode
    };

    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании заказа."
            });
        });
};

// Получение всех заказов из базы данных
exports.findAll = (req, res) => {
    const status = req.query.status;
    var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

    Order.findAll({ 
        where: condition,
        include: ["client", "manager", "orderitems"]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при получении заказов."
        });
    });
};

// Найти один заказ по идентификатору
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id, { 
        include: ["client", "manager", "orderitems"] 
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Не найден заказ с id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ошибка при получении заказа с id=" + id
        });
    });
};

// Обновление заказа по идентификатору в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
        where: { orderNumber: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Заказ был успешно обновлен."
            });
        } else {
            res.send({
                message: `Невозможно обновить заказ с id=${id}. Возможно, заказ не найден или req.body пуст!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ошибка при обновлении заказа с id=" + id
        });
    });
};

// Удаление заказа с указанным идентификатором в запросе
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { orderNumber: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Заказ был успешно удален!"
            });
        } else {
            res.send({
                message: `Невозможно удалить заказ с id=${id}. Возможно, заказ не найден!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Не удалось удалить заказ с id=" + id
        });
    });
};

// Удаление всех заказов из базы данных
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} заказов были успешно удалены!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при удалении всех заказов."
        });
    });
};