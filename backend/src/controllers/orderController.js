const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, customerEmail, paymentMethodId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true
    });

    if (paymentIntent.status === 'succeeded') {
      const order = new Order({ products, totalPrice, customerEmail, paymentStatus: 'Paid' });
      await order.save();
      return res.json({ message: '✅ Order Placed', order });
    }
    
    res.status(400).json({ message: '❌ Payment Failed' });

  } catch (error) {
    console.error("❌ Payment Error:", error);
    res.status(500).json({ message: '❌ Internal Server Error', error: error.message });
  }
};
