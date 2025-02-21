import { z } from "zod";

export const categoryValidationSchema = z.object({
  categoryName: z.string(),
  description: z.string(),
});
