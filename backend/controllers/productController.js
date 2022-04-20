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
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    count: products.length,
    message: products,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'product not found',
    });
  }
  res.status(StatusCodes.OK).json({ success: true, product });
};
