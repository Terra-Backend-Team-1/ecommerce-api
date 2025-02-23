import { IOrder, IOrderMethodsTypes } from "@/interfaces/order.interface";
import { model, Model, Schema } from "mongoose";

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
		enum: ["pending", "completed", "cancelled", "paid", "delivered", "shipped"],
		default: "pending",
	},
	total: {
		type: Number,
		required: true,
	},
	subTotal: {
		type: Number,
		required: true,
	},
	tax: {
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
});
const OrderModel = model<IOrder, OrderModelType>("Order", OrderSchema);
export default OrderModel;
