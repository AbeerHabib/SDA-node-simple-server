"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProduct = exports.createProduct = exports.getAllProducts = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const uuid_1 = require("uuid");
let products = [
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
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = JSON.parse(yield promises_1.default.readFile('products.json', 'utf-8'));
        res.status(200).send({
            success: true,
            message: 'all products are returned',
            payload: products
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, description, price } = req.body;
        const newProduct = {
            id: (0, uuid_1.v4)(),
            name,
            image,
            description,
            price
        };
        const existingProducts = JSON.parse(yield promises_1.default.readFile('products.json', 'utf-8'));
        existingProducts.push(newProduct);
        yield promises_1.default.writeFile('products.json', JSON.stringify(existingProducts));
        res.status(201).send({
            success: true,
            message: 'the product is created'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getSingleProduct = (req, res, next) => {
    try {
        const { id } = req.params;
        const product = products.find((product) => product.id == id);
        if (!product) {
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
    catch (error) {
        next(error);
    }
};
exports.getSingleProduct = getSingleProduct;
