// pages/index.js
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: "url('/wine.jpg')" }}>
      
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text--foreground">Welcome to Our Store</h1>
        
        {/* Your content here */}
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white max-w-2xl">
          <p className="text-xl mb-4">Discover our amazing products collection</p>
          <Link href="/products" className="bg-orange-700 hover:bg-orange-800 text-white py-2 px-6 rounded">
            Shop Now
          </Link>
        </div>
      </main>
    </div>
    <Footer />
    </div>
  );
}