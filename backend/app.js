const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

// routes
const products = require('./routes/product.js');

app.use('/api/v1', products);

// error middleware
app.use(errorMiddleware);

module.exports = app;
