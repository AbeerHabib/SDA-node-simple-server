"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const status = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
        message: error.message
    });
};
exports.errorHandler = errorHandler;
