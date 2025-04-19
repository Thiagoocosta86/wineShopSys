const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Function to generate order number
const generateOrderNumber = async () => {
  const today = new Date();
  const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD format

  // Find the last order for today
  const lastOrder = await Order.findOne({ orderNumber: new RegExp(`^${datePrefix}`) })
                               .sort({ orderNumber: -1 });

  let newOrderNumber;
  if (lastOrder) {
    // Extract the last order's numeric part and increment
    const lastNumber = parseInt(lastOrder.orderNumber.slice(-4), 10);
    newOrderNumber = `${datePrefix}${String(lastNumber + 1).padStart(4, '0')}`;
  } else {
    // First order of the day
    newOrderNumber = `${datePrefix}0001`;
  }
  console.log("Generated Order Number:", newOrderNumber);
  return newOrderNumber;
};

exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, customerEmail, paymentMethodId } = req.body;

    if (totalPrice < 0.50) {
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
      const orderNumber = await generateOrderNumber();
      if (!orderNumber) {
        return res.status(500).json({ message: "❌ Failed to generate order number." });
      }
      const order = new Order({ orderNumber,products, totalPrice, customerEmail, paymentStatus: 'Paid',  paymentIntentId: paymentIntent.id, });
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

exports.getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });

    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    // Find order by orderNumber instead of _id
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });

    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    if (order.paymentStatus === 'Paid') {
      if (!order.paymentIntentId) {
        return res.status(400).json({ message: "❌ Missing PaymentIntent ID, cannot process refund" });
      }

      // Refund the payment
      const refund = await stripe.refunds.create({
        payment_intent: order.paymentIntentId,
      });

      order.paymentStatus = 'Refunded';
      await order.save();

      // Delete order after refund
      await Order.deleteOne({ orderNumber: req.params.orderNumber });

      return res.json({ message: "✅ Order cancelled, payment refunded, and order deleted", refund });
    } else {
      await Order.deleteOne({ orderNumber: req.params.orderNumber });
      return res.json({ message: "✅ Order cancelled and deleted (no payment to refund)" });
    }
  } catch (error) {
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { cart, success_url, cancel_url } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
};
