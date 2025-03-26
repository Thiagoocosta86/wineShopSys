import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cart } = req.body;

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cart.map((item) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Convert to cents
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/success`, // Redirect after successful payment
        cancel_url: `${req.headers.origin}/cart`, // Redirect if payment is canceled
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}