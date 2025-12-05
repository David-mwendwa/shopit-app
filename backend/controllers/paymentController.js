import { StatusCodes } from 'http-status-codes';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process stripe payments => /api/v1/payment/process
export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, client_secret: paymentIntent.client_secret });
});

// Send Stripe API Key => /api/stripeapi
export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
