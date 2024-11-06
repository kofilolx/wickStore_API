const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');

// Initialize PayPal environment
const payPalEnvironment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const payPalClient = new paypal.core.PayPalHttpClient(payPalEnvironment);

// Add Payment to Database
const addPayment = async (data) => {
  try {
    await Payment.create(data);
  } catch (error) {
    console.log("Payment Failed!", error);
  }
}

// Stripe Payment Processing
exports.processStripePayment = asyncErrorHandler(async (req, res, next) => {
  const { amount, currency = 'usd' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        company: "Your Company",
      },
    });

    await addPayment({
      userId: req.user.id,
      amount,
      currency,
      paymentMethod: 'stripe',
      paymentStatus: 'pending',
      transactionId: paymentIntent.id,
      orderId: uuidv4(),
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler("Stripe Payment Failed", 500));
  }
});

// PayPal Payment Processing
exports.processPayPalPayment = asyncErrorHandler(async (req, res, next) => {
  const { amount, currency = 'USD' } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount
        }
      }
    ]
  });

  try {
    const order = await payPalClient.execute(request);

    await addPayment({
      userId: req.user.id,
      amount,
      currency,
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      transactionId: order.result.id,
      orderId: uuidv4(),
    });

    res.status(200).json({
      success: true,
      orderID: order.result.id,
      approvalLink: order.result.links.find(link => link.rel === "approve").href
    });
  } catch (error) {
    return next(new ErrorHandler("PayPal Payment Failed", 500));
  }
});

// Retrieve Payment Status
exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
  const payment = await Payment.findOne({ orderId: req.params.id });

  if (!payment) {
    return next(new ErrorHandler("Payment Details Not Found", 404));
  }

  const txn = {
    id: payment.transactionId,
    status: payment.paymentStatus,
  };

  res.status(200).json({
    success: true,
    txn,
  });
});

// Send Stripe API Key
exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
