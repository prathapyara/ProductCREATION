import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { mongoDB } from './Database/config.js';
// Note the use of named import

import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';

const app = express();


// Get the directory path

mongoDB();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);

app.listen(3100, () => {
  console.log('Server is running on port 3100');
});
