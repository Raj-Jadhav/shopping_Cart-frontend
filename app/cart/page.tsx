'use client';

import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "@/services/api";
import { Item } from "@/lib/types";

type CartItem = {
  id: number;
  item: Item;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await apiGet<CartItem[]>("/cart/");
      setCartItems(data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a cart item
  const handleDelete = async (id: number) => {
    setDeletingIds((prev) => [...prev, id]);
    try {
      await apiDelete(`/cart/items/${id}/`);
      // Remove locally
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item", err);
      alert("Failed to delete item. Check console for details.");
    } finally {
      setDeletingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="p-8">Loading cart...</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((cartItem) => (
            <li
              key={cartItem.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{cartItem.item.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
              </div>
              <button
                disabled={deletingIds.includes(cartItem.id)}
                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={() => handleDelete(cartItem.id)}
              >
                {deletingIds.includes(cartItem.id) ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
