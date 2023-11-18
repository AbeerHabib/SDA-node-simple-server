"use strict";
// express.js Assignment
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const productsRoute_1 = __importDefault(require("./routes/productsRoute"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use(indexRoute_1.default);
app.use("/products", productsRoute_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
