import IProduct from "@/interfaces/product.interface";
import { Model, model, Schema } from "mongoose";

type ProductModelType = Model<IProduct>;
const productSchema: Schema<IProduct, ProductModelType> = new Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    imageUrl: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
        defualt: "Naira",
    },
    countInStock: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
        defualt: 0.0,
    },
    rating: {
        type: Number,
        required: false,
        defualt: 1,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        defualt: Date.now(),
    },
    UpdatedAt: {
        type: Date,
        defualt: Date.now(),
    },
});

const ProductModel = model<IProduct, ProductModelType>(
    "Product",
    productSchema
);
export default ProductModel;
