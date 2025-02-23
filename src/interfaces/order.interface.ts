import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface IOrder extends Document<any>, TimeStamps {
    user: Schema.Types.ObjectId;
    products: Array<{
        product: string;
        quantity: number;
    }>;
    status: "pending" | "completed" | "cancelled";
    subTotalPrice: number;
    paymentId: string;
    paymentStatus: string;
    shippingAddress: string;
    shippingPrice: number;
    itemsPrice: number;
    paymentMethod: string;
    taxPrice: number;
    totalPrice: number;
}

export interface IOrderMethodsTypes {
    updateOrderStatus: (
        status: "pending" | "completed" | "cancelled"
    ) => Promise<IOrder>;
}
