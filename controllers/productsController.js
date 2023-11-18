import fs from 'fs/promises';

import { v4 as uuidv4 } from 'uuid';

let products = [
    {
      id: 1,
      name: 'Apple Iphone 14',
      image: '',
      description: '',
      price: '1320'
    },
    {
      id: 2,
      name: 'Apple Iphone 12',
      image: '',
      description: '',
      price: '520'
    }
];

export const getAllProducts = async (req, res) => {
    try {
        const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
        res.status(200).send({
            success: true,
            message: 'all products are returned',
            payload: products
        });
    }
    catch(error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, image, description, price } = req.body;
        const newProduct = {
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
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const getSingleProduct = (req, res) => {
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
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}