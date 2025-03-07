const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ name: String, price: Number, quantity: Number }],
  totalPrice: Number,
  customerEmail: String,
  paymentStatus: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
