const { validationResult } = require('express-validator');

exports.checkRequestValidity = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        next(error);
    } else {
        next();
    }
};
