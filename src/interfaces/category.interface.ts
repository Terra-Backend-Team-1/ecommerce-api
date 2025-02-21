import { Document } from "mongoose";

interface ICategory extends Document {
  categoryName: string
  description: string
  createdAt: Date
}
