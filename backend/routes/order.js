import express from 'express';
import {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/order/new').post(authenticate, newOrder);
router.route('/orders/me').get(authenticate, myOrders);
router.route('/order/:id').get(authenticate, getSingleOrder);
router
  .route('/admin/orders')
  .get(authenticate, authorizeRoles('admin'), allOrders);
router
  .route('/admin/order/:id')
  .patch(authenticate, authorizeRoles('admin'), updateOrder)
  .delete(authenticate, authorizeRoles('admin'), deleteOrder);

export default router;
