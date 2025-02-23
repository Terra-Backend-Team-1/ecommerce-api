import { IOrder, IOrderMethodsTypes } from "@/interfaces/order.interface";
import { model, Model, Schema } from "mongoose";
import { IShippingAddress } from "@/schemas/order.validation.schema";

const ShippingAddress = new Schema({
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

type OrderModelType = Model<IOrder, {}, IOrderMethodsTypes>;

const OrderSchema = new Schema<IOrder, OrderModelType>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: [
            "pending",
            "completed",
            "cancelled",
            "paid",
            "delivered",
            "shipped",
        ],
        default: "pending",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    taxPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    shippingAddress: ShippingAddress,
    shippingPrice: {
        type: Number,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["payment-gateway", "cash"],
        required: true,
    },
});
const OrderModel = model<IOrder, OrderModelType>("Order", OrderSchema);
export default OrderModel;
