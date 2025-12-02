const db = require("../models");
const OrderItem = db.orderitems;
const Op = db.Sequelize.Op;

// Создание и сохранение новой позиции заказа
exports.create = (req, res) => {
    if (!req.body.salePrice || !req.body.orderNumber || !req.body.carCode) {
        res.status(400).send({
            message: "Содержимое не может быть пустым! Поля salePrice, orderNumber и carCode обязательны."
        });
        return;
    }

    const orderItem = {
        salePrice: req.body.salePrice,
        orderNumber: req.body.orderNumber,
        carCode: req.body.carCode
    };

    OrderItem.create(orderItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании позиции заказа."
            });
        });
};

// Получение всех позиций заказа из базы данных
exports.findAll = (req, res) => {
    OrderItem.findAll({ 
        include: ["order", "car"]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при получении позиций заказа."
        });
    });
};

// Найти одну позицию заказа по идентификатору
exports.findOne = (req, res) => {
    const id = req.params.id;

    OrderItem.findByPk(id, { 
        include: ["order", "car"]
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Не найдена позиция заказа с id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ошибка при получении позиции заказа с id=" + id
        });
    });
};

// Обновление позиции заказа по идентификатору в запросе
exports.update = (req, res) => {
    const id = req.params.id;

    OrderItem.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Позиция заказа была успешно обновлена."
            });
        } else {
            res.send({
                message: `Невозможно обновить позицию заказа с id=${id}. Возможно, позиция не найдена или req.body пуст!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ошибка при обновлении позиции заказа с id=" + id
        });
    });
};

// Удаление позиции заказа с указанным идентификатором в запросе
exports.delete = (req, res) => {
    const id = req.params.id;

    OrderItem.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Позиция заказа была успешно удалена!"
            });
        } else {
            res.send({
                message: `Невозможно удалить позицию заказа с id=${id}. Возможно, позиция не найдена!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Не удалось удалить позицию заказа с id=" + id
        });
    });
};

// Удаление всех позиций заказа из базы данных
exports.deleteAll = (req, res) => {
    OrderItem.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} позиций заказа были успешно удалены!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Произошла ошибка при удалении всех позиций заказа."
        });
    });
};