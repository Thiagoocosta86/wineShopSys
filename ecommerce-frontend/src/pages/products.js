
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to load products");
        setLoading(false);
        console.error("Error fetching products", error);
      });
  }, []);

  return (
    <div>
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
    <Footer />
    </div>
  );
}