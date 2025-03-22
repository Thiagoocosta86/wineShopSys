import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 shadow">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>€{product.price}</p>
      <Link href={`/products/${product._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">View Details</button>
      </Link>
    </div>
  );
}
