"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center rounded-2xl mt-2 px-6 py-4 bg-gray-400 shadow">
      <Link href="/" className="text-xl text-black font-bold">
        Welcome To Store
      </Link>

      <Link href="/checkout" className="relative text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}
