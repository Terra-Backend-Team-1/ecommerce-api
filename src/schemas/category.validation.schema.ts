import { type } from "os";
import { z } from "zod";

export const categoryValidationSchema = z.object({
    categoryName: z.string(),
    description: z.string() || null,
});

export type ICategoryData = z.infer<typeof categoryValidationSchema>; 
