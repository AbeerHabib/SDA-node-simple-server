import { NextFunction, Request, Response } from "express";

export const getDefaultMessage = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send({
            success: true,
            message: 'Hello, World!'
        });
    }
    catch(error) {
        next(error);
    }
};