const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  customerEmail: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Refunded'], default: 'Pending' },
  paymentIntentId: String, // Stores PaymentIntent ID
  status: { type: String, enum: ['Active', 'Cancelled'], default: 'Active' }, // Track order status
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);



