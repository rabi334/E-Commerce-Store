import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product: Product = await res.json();

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={200}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          {product.title}
        </h1>
        <p className="mt-2 text-gray-300 text-lg">$ {product.price}</p>

        {product.rating && (
          <p className="mt-2 text-yellow-400 text-sm">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
        )}

        {product.description && (
          <p className="mt-4 text-gray-400">{product.description}</p>
        )}

        <Link
          href="/"
          className="mt-6 inline-block text-green-400 hover:text-blue-500"
        >
          ← Back to products
        </Link>
      </div>
    </div>
  );
}
