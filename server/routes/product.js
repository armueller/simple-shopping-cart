const express = require('express');
const { query, param } = require('express-validator');

const { checkRequestValidity } = require('../middleware/checkRequestValidity');
const productController = require('../controllers/product');

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
    ], checkRequestValidity, productController.readProducts);
router.get('/:productId',
    [
        param('productId')
            .isString()
            .isLength({ min: 24, max: 24 })
            .withMessage('productId is not valid'),
    ], checkRequestValidity, productController.readProduct);

module.exports = router;