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

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(
      new ErrorHandler(`No order found with this ID`, StatusCodes.NOT_FOUND)
    );
  }
  res.status(StatusCodes.OK).json({ success: true, order });
});

// Get logged in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(StatusCodes.OK).json({ success: true, orders });
});

// Get all orders - admin => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({});
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(StatusCodes.OK).json({ success: true, totalAmount, orders });
});

// Update / Process order - admin => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === 'Delivered') {
    return next(
      new ErrorHandler(
        'You have already delivered this order',
        StatusCodes.BAD_REQUEST
      )
    );
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'Order Updated!', order });
});

// decrements is the num of stock on product purchase
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}
