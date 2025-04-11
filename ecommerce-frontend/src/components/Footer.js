import Link from "next/link";

import Image from "next/image";


export default function Navbar() {
 

  return (
    <nav className="bg-white-300 ">
      
      <div className="grid place-items-center h-full">
      

        <Link href="/" className="text-1xl font-medium">
          Monchoir Wine - 2025
        </Link>
        
        
      </div>
    </nav>
  );
}