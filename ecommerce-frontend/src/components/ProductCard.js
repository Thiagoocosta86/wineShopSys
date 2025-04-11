// components/ProductCard.js
import Link from "next/link";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      // First check if product is in stock
      if (product.stock <= 0) {
        alert("This product is out of stock");
        return;
      }

      // Add to cart with quantity = 1
      addToCart({ ...product, quantity: 1 });
  
      // Update stock in the backend
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
      await axios.patch(`${API_URL}/api/products/${product._id}/stock`, {
        stock: product.stock - 1,
      });

    } catch (error) {
      console.error("Error updating stock", error);
      // Optionally show error to user
      alert("Failed to add item to cart. Please try again.");
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
            disabled={product.stock <= 0}
            className={`flex-1 py-2 rounded ${
              product.stock <= 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-700 text-white hover:bg-red-900'
            }`}
          >
            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}