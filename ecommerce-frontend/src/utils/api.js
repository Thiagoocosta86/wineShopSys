const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";// Calls backend for order storage
const ORDER_API_URL = `${API_URL}/api/orders`;

// ✅ Calls Next.js API route to handle payments (Stripe, PayPal)
export const processPayment = async (paymentData) => {
  const response = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};

// ✅ Calls external backend to store orders in MongoDB/Firebase

export const createOrder = async (orderData) => {
  const response = await fetch(`${ORDER_API_URL}/checkout`, { // Call backend for payments
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return response.json();
};


export const getOrders = async () => {
  const response = await fetch(ORDER_API_URL);
  return response.json();
};

export const getOrderByNumber = async (orderNumber) => {
  const response = await fetch(`${ORDER_API_URL}/${orderNumber}`);
  return response.json();
};

export const deleteOrder = async (orderNumber) => {
  const response = await fetch(`${ORDER_API_URL}/${orderNumber}`, { method: "DELETE" });
  return response.json();
};
