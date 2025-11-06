"use client";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";

export default function ProductListPage() {
  return (
    <div className="px-8 md:px-16 lg:px-24">
      <Navbar />
      <ProductGrid />
    </div>
  );
}
