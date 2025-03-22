import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/api/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error("Error fetching product details", error));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-1/2" />
      <p className="text-lg">${product.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  );
}
