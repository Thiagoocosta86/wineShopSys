// components/ProductCard.js
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

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
            className="flex-1 text-center py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}