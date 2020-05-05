const { Order } = require('../models/order');

exports.readOrders = async (req, res, next) => {
    const { limit, page } = req.query;

    try {
        const orders = await Order.find(limit, page);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.readOrder = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOneById(orderId);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createOrder = async (req, res, next) => {
    const { orderItems } = req.body;

    try {
        const orderTimestamp = await Order.saveNew(orderItems);
        res.status(200).json(orderTimestamp);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
