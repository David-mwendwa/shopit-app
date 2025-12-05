import express from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  logout,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from '../controllers/authController.js';

import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(authenticate, getUserProfile);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').patch(resetPassword);
router.route('/password/update').patch(authenticate, updatePassword);
router.route('/me/update').patch(authenticate, updateProfile);
router
  .route('/admin/users')
  .get(authenticate, authorizeRoles('admin'), allUsers);
router
  .route('/admin/user/:id')
  .get(authenticate, authorizeRoles('admin'), getUserDetails)
  .patch(authenticate, authorizeRoles('admin'), updateUser)
  .delete(authenticate, authorizeRoles('admin'), deleteUser);

export default router;
