const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerpage = 2;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerpage);
  const products = await apiFeatures.query;
  res.status(StatusCodes.OK).json({
    success: true,
    count: products.length,
    productCount,
    products: products,
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

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user === req.user._id.toString()
  );
  // if reviewed, update the preview review
  // TODO: resolve a bug on this if statement - user shouldn't submit multiple reviews
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: 'Review Submitted', review });
});
