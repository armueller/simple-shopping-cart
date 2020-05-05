const express = require('express');
const { query, param, body } = require('express-validator');

const { checkRequestValidity } = require('../middleware/checkRequestValidity');
const orderController = require('../controllers/order');

const router = express.Router();

router.get('',
    [
        query('limit')
            .isInt({ min: 1, max: 10 })
            .toInt()
            .withMessage('limit must be greater than 1 and less than or equal to 10'),
        query('page')
            .isInt({ min: 0 })
            .toInt()
            .withMessage('page must be greater than or equal to 0')
    ], checkRequestValidity, orderController.readOrders);

router.get('/:orderId',
    [
        param('orderId')
            .isString()
            .isLength({ min: 24, max: 24 })
            .withMessage('orderId is not valid'),
    ], checkRequestValidity, orderController.readOrder);

router.post('',
    [
        body('orderItems')
            .isArray()
            .isLength({ min: 1 })
            .withMessage('order must have at least 1 item'),
    ], checkRequestValidity, orderController.createOrder);

module.exports = router;