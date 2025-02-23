import { Document } from "mongoose";
import { IUser } from "./user.interface";
import ICategory from "./category.interface";

export interface IProduct extends Document {
    productName: string;
    description: string;
    category: ICategory;
    imageUrl: string;
    currency: "Naira" | "Dollar";
    countInStock: Number;
    price: Number;
    rating: Number;
    review: IReview[]
    numOfReview: Number
    createdBy: IUser;
    createdAt: Date;
    UpdatedAt: Date;
}


export interface IReviewData {
    rating: Number,
    comment: string
}

export interface IProductRes {
    product: IProduct[];
    currentPage?: Number;
    totalPage?: Number;
    totalNoOfProducts?: Number;
}

export interface IProductUpdate {
    productName?: string;
    description?: string;
    category?: ICategory;
    imageUrl?: string;
    currency?: "Naira" | "Dollar";
    countInStock?: Number;
    price?: Number;
    rating?: Number;
    UpdatedAt?: Number;
}

export interface IReview extends Document {
    user: IUser
    name: string
    rating: Number
    comment: string
    createdAt: Date
}

export default IProduct;
