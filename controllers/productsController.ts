import fs from 'fs/promises';
import { NextFunction, Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { product } from '../types';

let products: product[] = [
    {
      id: "1",
      name: 'Apple Iphone 14',
      image: '',
      description: '',
      price: '1320'
    },
    {
      id: "2",
      name: 'Apple Iphone 12',
      image: '',
      description: '',
      price: '520'
    }
];

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: product = JSON.parse(await fs.readFile('products.json', 'utf-8'));
        res.status(200).send({
            success: true,
            message: 'all products are returned',
            payload: products
        });
    }
    catch(error) {
        next(error);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, image, description, price } = req.body;
        const newProduct: product = {
            id: uuidv4(),
            name,
            image,
            description,
            price
        }
        const existingProducts = JSON.parse(
            await fs.readFile('products.json', 'utf-8')
        );
        existingProducts.push(newProduct);
        await fs.writeFile('products.json', JSON.stringify(existingProducts));
        res.status(201).send({
            success: true,
            message: 'the product is created'
        });
    }
    catch(error) {
        next(error);
    }
}

export const getSingleProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = products.find((product) => product.id == id);
        if(!product) {
            res.status(404).send({
                success: false,
                message: 'product is not found',
            });
            return;
        }
        res.status(200).send({
            success: true,
            message: 'the product is returned',
            payload: product
        });
    }
    catch(error) {
        next(error);
    }
}