import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const CartContext = createContext();

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);

      if (existingProductIndex !== -1) {
        // If product exists, update its quantity
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // If product does not exist, add it to the cart with the selected quantity
        return [...prevCart, { ...product, quantity: product.quantity }];
      }
    });
  };

  const removeFromCart = async (productId) => {
    // Find the item being removed
    const removedItem = cart.find((item) => item._id === productId);
  
    if (removedItem) {
      // Remove the item from the cart
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  
      try {
        // Fetch the current stock from the database
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
        const currentStock = response.data.stock;
  
        // Update the stock in the backend
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/stock`, {
          stock: currentStock + removedItem.quantity, // Add the quantity back to the current stock
        });
      } catch (error) {
        console.error("Error updating stock", error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}