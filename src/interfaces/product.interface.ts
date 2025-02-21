import { Document } from "mongoose";
import { IUser } from "./user.interface";
import ICategory from "./category.interface";

interface IProduct extends Document {
  productName: string
  description: string
  category: ICategory
  imageUrl: string
  countInStock: Number
  price: Number
  rating: Number
  createdBy: IUser
  createdAt: Date
  UpdatedAt: Date
}

export default IProduct;
