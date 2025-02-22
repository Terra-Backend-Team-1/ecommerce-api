import { z } from "zod";
import { categoryValidationSchema } from "./category.validation.schema";

export const ProductValidationSchema = z.object({
  productName: z.string(),
  description: z.string(),
  category: categoryValidationSchema,
  imageUrl: z.string(),
  currency: z.string(),
  countInStock: z.number(),
  price: z.number(),
  rating: z.number(),
});

export type IProductData = z.infer<typeof ProductValidationSchema>;
