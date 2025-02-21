import { Document } from "mongoose";
import { IUser } from "./user.interface";

interface IProduct extends Document {
  productName: string
  description: string
  image: string
  countInStock: Number
  price: Number
  rating: Number
  createdBy: IUser
  createdAt: Date
  UpdatedAt: Date
}

export default IProduct;
