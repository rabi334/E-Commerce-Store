"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCategories } from "@/app/hooks/useCategories";

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: '{"rate": 0, "count": 0}',
  });
  const { data: categories, isLoading } = useCategories();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let parsedRating;
    try {
      parsedRating = JSON.parse(form.rating);
    } catch (err) {
      alert('Invalid rating format. Use: {"rate": 3.9, "count": 70}');
      return;
    }

    const newProduct = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
      rating: parsedRating,
    };

    await axios.post("/api/products", newProduct);
    router.push("/admindashboard");
  };
  console.log(categories);
  return (
    <div className="container mx-auto w-8/12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center p-6 space-y-4"
      >
        <div className="flex bg-gray-400 text-black w-11/12 mb-6 rounded-2xl">
          <h1 className="text-2xl font-bold mx-auto">Add Products</h1>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full"
          required
        >
          {categories?.map((cat: any) => (
            <option
              className="bg-black text-white"
              key={cat.id}
              value={cat.name}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder='Rating JSON: {"rate": 3.9, "count": 70}'
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className="border p-2 w-full font-mono"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-whited w-1/5 px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
