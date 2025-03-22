import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cart } = useCart();

  async function handleCheckout() {
    const response = await axios.post("/api/checkout", { cart });
    window.location.href = response.data.url; // Redirect to Stripe
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Checkout</h1>
      {cart.map((item) => (
        <p key={item._id}>{item.name} - ${item.price}</p>
      ))}
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Pay Now
      </button>
    </div>
  );
}
