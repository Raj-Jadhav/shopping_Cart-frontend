'use client';

import { useCallback, useEffect, useState } from "react";
import AddItemForm from "./forms/addItem";
import ReusableDialog from "./reusables/dialog";
import ItemListCard from "./cards/ItemListCard";
import { Item } from "@/lib/types";
import { fetchItems, handleDeleteItemWithNotification } from "@/services/actions";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to load items:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteItem = useCallback(
    async (itemId: number) => {
      try {
        setDeletingId(itemId);
        await handleDeleteItemWithNotification(itemId);
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      } catch (err) {
        setDeletingId(null);
      }
    },
    []
  );

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <div className="grid items-center">
      <div className="text-5xl font-bold underline my-8">
        Shopping Cart
      </div>

      <div className="grid grid-cols-12">
        {/* ACTIONS */}
        <div className="col-span-2 flex flex-col">
          <div className="text-2xl font-bold my-4">Actions</div>

          <ReusableDialog
            form={<AddItemForm onSuccess={loadItems} />}
            description="Our Form to add items to Shopping list"
            title="Add items to Shopping list"
            buttonText="Add Item"
          />
        </div>

        {/* ITEMS LIST */}
        <div className="col-span-10 px-12">
          <div className="text-2xl font-bold my-4">
            Our Shopping List
          </div>

          {loading ? (
            <p>Loading items...</p>
          ) : items.length === 0 ? (
            <p>No items in the list.</p>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <ItemListCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                  isDeleting={deletingId === item.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
