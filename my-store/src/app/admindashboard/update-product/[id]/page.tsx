"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useCategories } from "@/app/hooks/useCategories";

export default function UpdateProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: categories, isLoading } = useCategories();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
  });

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      const p = res.data;
      setForm({
        title: p.title,
        price: p.price.toString(),
        description: p.description,
        category: p.category,
        image: p.image,
        rating: JSON.stringify(p.rating, null, 2),
      });
    });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    let parsedRating;
    try {
      parsedRating = JSON.parse(form.rating);
    } catch (err) {
      alert('Invalid rating format. Use: {"rate": 3.9, "count": 70}');
      return;
    }

    const updatedProduct = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
      rating: parsedRating,
    };

    await axios.put(`/api/products/${id}`, updatedProduct);
    router.push("/admindashboard");
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="flex justify-center text-2xl font-bold mb-4">
        Update Product
      </h2>

      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <textarea
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
          <option className="bg-black text-white" key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <textarea
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
        className="border p-2 w-full font-mono"
        required
      />

      <button
        type="submit"
        className="flex mx-auto bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Update Product
      </button>
    </form>
  );
}
