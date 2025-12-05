import express from 'express';
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from '../controllers/productController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router
  .route('/admin/product/new')
  .post(authenticate, authorizeRoles('admin'), newProduct);
router.route('/admin/products').get(getAdminProducts);
router
  .route('/admin/product/:id')
  .patch(authenticate, authorizeRoles('admin'), updateProduct)
  .delete(authenticate, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(authenticate, createProductReview);
router.route('/reviews').get(authenticate, getProductReviews);
router.route('/reviews').delete(authenticate, deleteReview);

export default router;
