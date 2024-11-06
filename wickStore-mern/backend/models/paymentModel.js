const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderId: {
    type: String,
    required: true
    },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'GHS'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
