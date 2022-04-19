const express = require('express');
const app = express();

app.use(express.json());

// routes
const products = require('./routes/product.js');

app.use('/api/v1', products);

module.exports = app;
