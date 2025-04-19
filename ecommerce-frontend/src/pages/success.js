import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // You might want to clear the cart here or show order details
  }, []);

  return (
    <div>
      <Navbar />
    <div className="min-h-screen container mx-auto p-4">
      
    <div className="max-w-md mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">Thank you for your purchase.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
}