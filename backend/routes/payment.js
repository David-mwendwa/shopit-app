import express from 'express';
import {
  processPayment,
  sendStripeApiKey,
} from '../controllers/paymentController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApiKey);

export default router;
