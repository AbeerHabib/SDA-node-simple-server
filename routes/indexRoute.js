import { Router } from "express";

import { getDefaultMessage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get('/', getDefaultMessage);

export default indexRouter;