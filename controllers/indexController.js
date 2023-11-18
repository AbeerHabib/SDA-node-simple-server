"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultMessage = void 0;
const getDefaultMessage = (req, res, next) => {
    try {
        res.status(200).send({
            success: true,
            message: 'Hello, World!'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDefaultMessage = getDefaultMessage;
