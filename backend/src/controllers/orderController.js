const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, customerEmail, paymentMethodId } = req.body;

    if (totalPrice < 0.01) {
      return res.status(400).json({ message: "❌ Order amount must be at least $0.50." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:  Math.round(totalPrice * 100),
      currency: 'usd',
      payment_method_types: ["card"],
      payment_method: paymentMethodId,
      confirm: true,
     
    });

    if (paymentIntent.status === 'succeeded') {
      const order = new Order({ products, totalPrice, customerEmail, paymentStatus: 'Paid',  paymentIntentId: paymentIntent.id, });
      await order.save();
      return res.json({ message: '✅ Order Placed', order });
    }
    
    res.status(400).json({ message: '❌ Payment Failed' });

  } catch (error) {
    console.error("❌ Payment Error:", error);
    res.status(500).json({ message: '❌ Internal Server Error', error: error.message });
  }
};

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    if (order.paymentStatus === 'Paid') {
      if (!order.paymentIntentId) {
        return res.status(400).json({ message: "❌ Missing PaymentIntent ID, cannot process refund" });
      }

      try {
        // Refund the payment
        const refund = await stripe.refunds.create({
          payment_intent: order.paymentIntentId,
        });

        // Update order status
        order.paymentStatus = 'Refunded';
        order.status = 'Cancelled';
        await order.save();

        // Delete order after refund
        await Order.findByIdAndDelete(req.params.id);

        return res.json({ message: "✅ Order cancelled, payment refunded, and order deleted", refund });
      } catch (refundError) {
        return res.status(500).json({ message: "❌ Refund failed", error: refundError.message });
      }
    } else {
      // Delete order if no payment is involved
      await Order.findByIdAndDelete(req.params.id);
      return res.json({ message: "✅ Order cancelled and deleted (no payment to refund)" });
    }
  } catch (error) {
    return res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
};

