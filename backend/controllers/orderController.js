import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { BadRequestError, NotFoundError } from '../utils/customErrors.js';
import { StatusCodes } from 'http-status-codes';

// Create a new order => /api/v1/order/new
export const newOrder = async (req, res) => {
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
};

// Get single order => /api/v1/order/:id
export const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    throw new NotFoundError(`No order found with this ID`);
  }
  res.status(StatusCodes.OK).json({ success: true, order });
};

// Get logged in user orders => /api/v1/orders/me
export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(StatusCodes.OK).json({ success: true, orders });
};

// Get all orders - admin => /api/v1/admin/orders/
export const allOrders = async (req, res) => {
  const orders = await Order.find({});
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(StatusCodes.OK).json({ success: true, totalAmount, orders });
};

// Update / Process order - admin => /api/v1/admin/order/:id
export const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === 'Delivered') {
    throw new BadRequestError('You have already delivered this order');
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
};

// decrements the num of stock onProductPurchase
const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

// Delete order => /api/v1/admin/order/:id
export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new NotFoundError(`No order found with this ID`);
  }
  await order.remove();
  res.status(StatusCodes.OK).json({ success: true, msg: 'Order Deleted!' });
};
