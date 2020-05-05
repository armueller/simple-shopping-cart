const { Product } = require('../models/product');

exports.readProducts = async (req, res, next) => {
    const { limit, page } = req.query;

    try {
        const products = await Product.find(limit, page);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.readProduct = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOneById(productId);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
