"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

const Checkout = () => {
  const { cart, setCart, removeFromCart, clearCart } = useCart();

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link href="/" className="text-blue-600 underline mt-4 inline-block">
            ← Back to store
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-black bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 text-center border rounded"
                      min={1}
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-black bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">
                Total:{" "}
                <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </p>
              <button
                onClick={clearCart}
                className="mt-2 text-sm text-red-500 underline"
              >
                Clear Cart
              </button>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
