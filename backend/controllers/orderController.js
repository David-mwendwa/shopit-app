const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { StatusCodes } = require('http-status-codes');

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({ success: true, order });
});
