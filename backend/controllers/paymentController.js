const { StatusCodes } = require('http-status-codes');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.name,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, client_secret: paymentIntent.client_secret });
});

// Send Stripe API Key => /api/stripeapi
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
