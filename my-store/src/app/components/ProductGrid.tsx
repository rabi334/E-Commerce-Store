"use client";
import Image from "next/image";
import useProducts from "../hooks/useProducts";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";
import { useState } from "react";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductGrid() {
  const { data, isLoading, error } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = data || [];

  const categories = Array.from(
    new Set(products.map((p: any) => p.category))
  ) as string[];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: any) => p.category === selectedCategory);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className=" max-w-max  px-8 md:px-16 lg:px-24">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product: any) => (
          <div
            key={product.id}
            className="flex flex-col justify-center py-2 bg-gray-800 px-6 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={50}
              className="mx-auto max-h-30 my-2 w-auto h-auto"
            />
            <h3 className="mt-2 text-[10px] sm:text-[13px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {product.title}
            </h3>
            <p className="mt-2 text-[10px] sm:text-[13px] text-gray-300">
              $ {product.price}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="mt-2 text-[10px] sm:text-[13px] inline-block text-green-400 hover:text-blue-500"
            >
              details
            </Link>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
