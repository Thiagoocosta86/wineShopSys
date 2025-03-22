import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate total price for each item
  const calculateItemTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  // Calculate overall cart total
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle remove item with confirmation
  const handleRemoveFromCart = (productId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this item from the cart?");
    if (confirmRemove) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="border p-4 my-2">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>Price: €{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: €{calculateItemTotal(item.price, item.quantity)}</p>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Cart Total: €{calculateCartTotal()}</h2>
          </div>
        </>
      )}
    </div>
  );
}