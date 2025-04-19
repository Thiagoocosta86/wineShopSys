import { useCart } from "../context/CartContext";
import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckout() {
    try {
      setLoading(true);
      setError(null);
      
      if (!cart || cart.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Fix the API endpoint to point to your backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create-checkout-session`, { 
        cart: cart.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cart`
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('No redirect URL received from payment processor');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setError(error.response?.data?.error || error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
    <div className="min-h-screen container mx-auto p-4">
      
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-6">
        {cart.map(item => (
          <div key={item._id} className="flex justify-between border-b pb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="text-xl font-semibold mb-6">
        Total: €{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
        className={`w-full py-3 px-6 rounded-md text-white font-medium ${
          loading || cart.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
        <Footer />
    </div>
  );
}