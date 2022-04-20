const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({
    success: true,
    count: products.length,
    message: products,
  });
};
