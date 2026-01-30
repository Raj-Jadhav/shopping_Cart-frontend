// schema/addItemSchema.ts
import { z } from "zod";

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

export type AddItemSchema = z.infer<typeof addItemSchema>;
