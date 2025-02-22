import IProduct, { IReview } from "@/interfaces/product.interface"
import { model, Schema } from "mongoose"

const productReviewSchema: Schema<IReview> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const productSchema: Schema<IProduct> = new Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    imageUrl: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        defualt: "Naira"
    },
    countInStock: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        defualt: 0
    },
    rating: {
        type: Number,
        required: false,
        defualt: 1
    },
    review: [productReviewSchema],
    numOfReview: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        defualt: Date.now()
    },
    UpdatedAt: {
        type: Date,
        defualt: Date.now()
    }
});

export const productReviewModel = model<IReview>("ProductReview", productReviewSchema);
export const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
