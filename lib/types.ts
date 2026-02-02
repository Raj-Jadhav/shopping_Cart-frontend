import { ReactNode } from "react";
import { z } from "zod";

/**
 * Dialog component props
 */
export interface DialogProps {
  form: ReactNode;
  buttonText: string;
  title: string;
  description: string;
}

/**
 * Item interface for product items
 */
export interface Item {
  id: number;
  name: string;
  description: string;
  photo?: string | null;
}

/**
 * Props for ItemListCard component
 */
export interface ItemListCardProps {
  item: Item;
  onDelete: (itemId: number) => Promise<void>;
  isDeleting?: boolean;
}

/**
 * Add Item Form Schema (Zod schema)
 */
export const addItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required"),
  photo: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
      "Only JPG, PNG or WEBP images allowed"
    ),
});

/**
 * Type inferred from addItemSchema
 */
export type AddItemSchema = z.infer<typeof addItemSchema>;