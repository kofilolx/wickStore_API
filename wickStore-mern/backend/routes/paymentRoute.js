const express = require('express');
const router = express.Router();
const {
  processStripePayment,
  processPayPalPayment,
  sendStripeApiKey,
  getPaymentStatus
} = require('../controller/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

// Stripe Payment Route
router.route('/payment/process/stripe').post(isAuthenticatedUser, processStripePayment);

// PayPal Payment Route
router.route('/payment/process/paypal').post(isAuthenticatedUser, processPayPalPayment);

// Stripe API Key Route
router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);

// Payment Status Route
router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);

module.exports = router;
