"use client";
import ProductGrid from "./components/ProductGrid";
import Navbar from "./components/Navbar"
export default function HomePage() {
  return (
    <div className="px-8 md:px-16 lg:px-24">
      <Navbar/>
      <ProductGrid />
    </div>
  );
}
