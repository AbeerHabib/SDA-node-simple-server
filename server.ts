// express.js Assignment

import express, { Application } from 'express';
import 'dotenv/config';
import morgan from 'morgan';

import indexRoute from './routes/indexRoute';
import productsRoute from './routes/productsRoute';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(indexRoute);
app.use("/products", productsRoute);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});