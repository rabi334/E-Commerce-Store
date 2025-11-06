"use client";

import useProducts from "@/app/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  async function handleRemove(id: number) {
    try {
      await axios.delete(`/api/products/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  const { data, isLoading, isError } = useProducts();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="p-6">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-[16px] sm:text-2xl font-bold mr-2">My Products</h1>
        <div className="">
          <button
            onClick={() => router.push("/admindashboard/add-product")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
          <button
            onClick={() => router.push("/adminlogin")}
            className="bg-blue-600 text-white ml-5 px-4 py-2 rounded hover:bg-blue-700"
          >
            LogOut
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-600 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product: any) => (
            <tr key={product.id} className="border-b">
              <td className="p-3 border text-white">{product.title}</td>
              <td className="p-3 border">${product.price}</td>
              <td className="p-3 border">{product.category}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() =>
                    router.push(`/admindashboard/update-product/${product.id}`)
                  }
                  className="bg-yellow-500 text-white mb-2 px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
