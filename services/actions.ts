/**
 * Business logic and action handlers for items
 * Reusable functions for add, delete, fetch operations
 */

import { Item, AddItemSchema } from "@/lib/types";
import { apiGet, apiDelete, apiPostForm } from "@/services/api";
import { toast } from "sonner";

/**
 * Fetch all items from the backend
 * @returns Promise with array of items
 */
export async function fetchItems(): Promise<Item[]> {
  try {
    const data = await apiGet<Item[]>("/products/items/get/");
    return data;
  } catch (err) {
    console.error("Failed to fetch items:", err);
    throw new Error("Failed to fetch items");
  }
}

/**
 * Delete an item by ID
 * @param itemId - ID of the item to delete
 * @returns Promise<void>
 */
export async function deleteItem(itemId: number): Promise<void> {
  try {
    await apiDelete(`/products/items/delete/${itemId}/`);
  } catch (err) {
    console.error("Failed to delete item:", err);
    throw new Error("Failed to delete item");
  }
}

/**
 * Add a new item with form data (including file upload)
 * @param formData - FormData object containing item details
 * @returns Promise<void>
 */
export async function addItem(formData: FormData): Promise<void> {
  try {
    await apiPostForm("/products/items/add/", formData);
  } catch (err) {
    console.error("Failed to add item:", err);
    throw new Error("Failed to add item");
  }
}

/**
 * Handle item deletion with error handling and toast notifications
 * @param itemId - ID of the item to delete
 * @returns Promise<void>
 */
export async function handleDeleteItemWithNotification(
  itemId: number
): Promise<void> {
  toast.loading("Deleting item...", { id: "delete-item" });
  try {
    await deleteItem(itemId);
    toast.success("Item deleted successfully", { id: "delete-item" });
  } catch (err) {
    toast.error("Failed to delete item", { id: "delete-item" });
    throw err;
  }
}

/**
 * Handle item addition with error handling and toast notifications
 * @param formData - FormData object containing item details
 * @returns Promise<void>
 */
export async function handleAddItemWithNotification(
  formData: FormData
): Promise<void> {
  toast.loading("Adding item...", { id: "add-item" });
  try {
    await addItem(formData);
    toast.success("Item added successfully", { id: "add-item" });
  } catch (err) {
    toast.error("Failed to add item", { id: "add-item" });
    throw err;
  }
}
