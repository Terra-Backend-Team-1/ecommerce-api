import ICategory from "@/interfaces/category.interface";
import { model, Schema } from "mongoose";

const categorySchema: Schema<ICategory> = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryModel = model<ICategory>("Category", categorySchema);

export default CategoryModel;
