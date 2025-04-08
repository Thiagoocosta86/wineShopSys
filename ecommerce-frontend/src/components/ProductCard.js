// components/ProductCard.js
import Link from "next/link";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      // Add to cart with quantity = 1
      addToCart({ ...product, quantity: 1 });
  
      // Update stock in the backend
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}/stock`, {
        stock: product.stock - 1,
      });
  
      // Note: We don't refresh product data here since it's a card component
      // and we don't show stock information in the card
    } catch (error) {
      console.error("Error updating stock", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <span className="text-sm text-gray-500">{product.category}</span>
        <h2 className="text-xl font-semibold mt-1">{product.name}</h2>
        <p className="text-lg font-bold mt-2">€{product.price}</p>
        
        <div className="mt-4 flex space-x-2">
          <Link 
            href={`/products/${product._id}`}
            className="flex-1 text-center py-2 border border-orange-700 text-orange-700 rounded hover:border-red-500"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 bg-orange-700 text-white rounded hover:bg-red-900"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}