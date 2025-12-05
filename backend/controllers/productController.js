import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';
import { NotFoundError } from '../utils/customErrors.js';
import APIFeatures from '../utils/apiFeatures.js';
import { v2 as cloudinary } from 'cloudinary';

export const newProduct = async (req, res) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
};

export const getProducts = async (req, res) => {
  const resultsPerPage = 8;
  const productCount = await Product.countDocuments();

  // get filtered products count
  const filtered = new APIFeatures(Product.find(), req.query).search().filter();
  let filteredProducts = await filtered.query;
  let filteredProductsCount = filteredProducts.count;

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  let products = await apiFeatures.query;

  res.status(StatusCodes.OK).json({
    success: true,
    filteredProductsCount,
    productCount,
    resultsPerPage,
    products: products,
  });
};

// get all products (admin) => /api/v1/admin/products
export const getAdminProducts = async (req, res) => {
  let products = await Product.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    products,
  });
};

export const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('product not found');
  }
  res.status(StatusCodes.OK).json({ success: true, product });
};

export const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('product not found');
  }

  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );

      let imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'products',
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesLinks;
    }
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ success: true, product });
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('product not found');
  }

  // Deleting images asociated with the product
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: 'product is deleted',
  });
};

// Create new review => /api/v1/review
export const createProductReview = async (req, res) => {
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
};

// Get Product Reviews => /api/v1/reviews
export const getProductReviews = async (req, res) => {
  const product = await Product.findById(req.query.id);
  res.status(StatusCodes.OK).json({ success: true, reviews: product.reviews });
};

// Delete Product Review => /api/v1/reviews
export const deleteReview = async (req, res) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(StatusCodes.OK).json({ success: true, msg: 'review is deleted' });
};
