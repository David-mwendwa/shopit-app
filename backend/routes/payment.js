import express from 'express';
import {
  processPayment,
  sendStripeApiKey,
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.route('/payment/process').post(authenticate, processPayment);
router.route('/stripeapi').get(authenticate, sendStripeApiKey);

export default router;
