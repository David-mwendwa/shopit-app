const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
};

exports.getProducts = (req, res, next) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'This route will show products in the database',
  });
};
