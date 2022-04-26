const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// routes
const products = require('./routes/product.js');
const auth = require('./routes/auth.js');
const order = require('./routes/order.js');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);

// error middleware
app.use(errorMiddleware);

module.exports = app;
