import express from 'express';
import {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router
  .route('/admin/order/:id')
  .patch(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;
