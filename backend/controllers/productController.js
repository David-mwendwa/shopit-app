const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products = await apiFeatures.query;
  res.status(StatusCodes.OK).json({
    success: true,
    count: products.length,
    message: products,
  });
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('product not found', StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({ success: true, product });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('product not found', StatusCodes.NOT_FOUND));
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ success: true, product });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('product not found', StatusCodes.NOT_FOUND));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: 'product is deleted',
  });
});
