import Link from "next/link";
import { useCart } from "../context/CartContext";
import Image from "next/image";


export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white-300 ">
      
      <div className="container mx-auto px-4 py-3 flex justify-between align-center items-center">
      <div>
        
        <Image src="/wineShopLogo.svg" alt="Monchoir Wine Logo" width={50} height={50} />
  
        </div>
        <Link href="/" className="text-2xl font-bold justify-center brand">
          Monchoir Wine
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-500">
            Products
          </Link>
          <Link href="/cart" className="relative hover:text-blue-500">
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}