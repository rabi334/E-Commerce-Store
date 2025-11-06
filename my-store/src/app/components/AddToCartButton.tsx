"use client";

import { useCart } from "../context/CartContext";

const AddToCartButton = ({ product }: { product: any }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-2 text-[9px] sm:text-[12px] sm:px-3 py-2 rounded ${
        isInCart
          ? "bg-gray-600 text-white hover:bg-gray-500"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isInCart ? "In Cart" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
