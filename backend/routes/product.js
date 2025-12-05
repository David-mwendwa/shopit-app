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
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/products').get(getAdminProducts);
router
  .route('/admin/product/:id')
  .patch(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

export default router;
