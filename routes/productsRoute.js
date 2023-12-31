import { Router } from "express";

import { getAllProducts, createProduct, getSingleProduct } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.post('/', createProduct);
productsRouter.get('/:id', getSingleProduct);

export default productsRouter;