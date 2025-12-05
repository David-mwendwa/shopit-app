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

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').patch(resetPassword);
router.route('/password/update').patch(isAuthenticatedUser, updatePassword);
router.route('/me/update').patch(isAuthenticatedUser, updateProfile);
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .patch(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
