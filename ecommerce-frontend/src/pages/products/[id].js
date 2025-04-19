import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/api/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error("Error fetching product details", error));
    }
  }, [id]);

  // Handle quantity changes
  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      // Add to cart
      addToCart({ ...product, quantity });
  
      // Update stock in the backend
      await axios.patch(`${API_URL}/api/products/${id}/stock`, {
        stock: product.stock - quantity,
      });
  
      // Refresh product data to reflect updated stock
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error updating stock", error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <h2 className="text-3xl font-bold">{product.category}</h2>
      <p className="text-lg">{product.description}</p>
      <img src={product.image} alt={product.name} className="w-1/2" />
      <p className="text-lg">€{product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center my-4">
        <button
          onClick={() => handleQuantityChange("decrement")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l"
          disabled={quantity === 1} // Disable if quantity is 1
        >
          -
        </button>
        <span className="bg-gray-100 px-4 py-2">
          {quantity} of {product.stock}
        </span>
        <button
          onClick={() => handleQuantityChange("increment")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r"
          disabled={quantity === product.stock} // Disable if quantity equals stock
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="flex-1 py-2 bg-orange-700 text-white rounded hover:bg-red-900"
      >
        Add to Cart
      </button>

      
    </div>
      <Footer />
    </div>
  );
}