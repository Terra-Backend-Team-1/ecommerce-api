import { TimeStamps } from "@/typing/util.typing";
import { Document, Schema } from "mongoose";

export interface IOrder extends Document<any>, TimeStamps {
	user: Schema.Types.ObjectId;
	products: Array<{
		product: string;
		quantity: number;
	}>;
	status: "pending" | "completed" | "cancelled";
	subTotal: number;
	total: number;
	tax: number;
	paymentId: string;
	paymentStatus: string;
}

export interface IOrderMethodsTypes {
	updateOrderStatus: (
		status: "pending" | "completed" | "cancelled"
	) => Promise<IOrder>;
}
