// components/Cart.js
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
      {cart.length === 0 ? (
        <div className="p-4 text-center">Your cart is empty</div>
      ) : (
        <>
          <div className="max-h-96 overflow-y-auto p-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between py-2 border-b">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm">
                    {item.quantity} × €{item.price}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <Link
              href="/cart"
              className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
            >
              View Cart
            </Link>
          </div>
        </>
      )}
    </div>
  );
}