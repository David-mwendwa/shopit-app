const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

// routes
const products = require('./routes/product.js');
const auth = require('./routes/auth.js');

app.use('/api/v1', products);
app.use('/api/v1', auth);

// error middleware
app.use(errorMiddleware);

module.exports = app;
