// node.js Assignment

import http from 'http';
import { parse } from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

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

const errorResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(message));
}

const successResponse = (res, statusCode, message, payload = {}) => {
  res.writeHead(statusCode, {'Content-Type': 'application/json'})
  res.end(JSON.stringify({
    message,
    payload
  }
  ));
}

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url == '/' && req.method == 'GET') {
    try {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify('Hello, World!'));
    }
    catch(error) {
      errorResponse(res, 500, error.message); 
    }
  }
  else if (req.url == '/' && req.method == 'POST') {
    try {
      res.writeHead(201, {'Content-Type': 'application/json'})
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const data = parse(body);
        console.log(data);
      });
      res.end('Data recieved successfully')
    }
    catch(error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url == '/products' && req.method == 'GET') {
    try {
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
      successResponse(
        res,
        200,
        'all products are returned',
        products,
      );
    }
    catch(error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url == '/products' && req.method == 'POST') {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        const data = parse(body);
        console.log(data);
        const newProduct = {
          id: uuidv4(),
          name: data.name,
          image: data.image,
          description: data.description,
          price: data.price
        }
        const existingProducts = JSON.parse(
          await fs.readFile('products.json', 'utf-8')
        );
        existingProducts.push(newProduct);
        await fs.writeFile('products.json', JSON.stringify(existingProducts));
        successResponse(
          res,
          201,
          'the product is created',
        );
      });
    }
    catch(error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method == 'GET') {
    try {
      const id = req.url.split('/')[2];
      const product = products.find((product) => product.id == id);
      if(!product) {
        errorResponse(res, 404, 'product is not found');
        return;
      }
      successResponse(
        res,
        200,
        'the product is returned',
        product,
      );
    }
    catch(error) {
      errorResponse(res, 500, error.message);
    }
  }
  else {
    errorResponse(res, 200, 'route not found');
  }
})

const PORT = 8080;
server.listen(PORT, ()=> {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});