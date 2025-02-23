import HTTPException from "@/exceptions/http.exception";
import { IOrder } from "@/interfaces/order.interface";
import OrderModel from "@/models/order.model";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class OrderService {
    private orderModel = OrderModel;

    // create order service
    async createOrder(orderData: IOrder): Promise<IOrder> {
        if (isEmpty(orderData)) {
            throw new HTTPException(
                StatusCodes.BAD_REQUEST,
                "Provide Order Data"
            );
        }
        const newOrder = await this.orderModel.create(orderData);
        return newOrder;
    }

    // get all orders service
    async getOrders(limit: number, page: number): Promise<IOrder[]> {
        const orders = await this.orderModel
            .find()
            .skip(limit * (page - 1))
            .limit(limit)
            .populate("product");
        return orders;
    }

    // get current user orders service
    async getUserOrders(
        userId: string,
        limit: number,
        page: number
    ): Promise<IOrder[]> {
        const orders = await this.orderModel
            .find({ user: userId })
            .skip(limit * (page - 1))
            .limit(limit)
            .populate("product");
        return orders;
    }

    // get order by id service
    async getOrderById(orderId: string): Promise<IOrder> {
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "Order not found");
        }
        return order;
    }

    // update order service
    async updateOrder(orderData: IOrder, orderId: string): Promise<IOrder> {
        if (isEmpty(orderData)) {
            throw new HTTPException(
                StatusCodes.BAD_REQUEST,
                "Provide Order Data"
            );
        }
        const order = await this.orderModel.findByIdAndUpdate(
            orderId,
            orderData,
            {
                new: true,
            }
        );
        if (!order) {
            throw new HTTPException(
                StatusCodes.NOT_FOUND,
                "Order does not exist"
            );
        }
        return order;
    }

    // delete order service
    async deleteOrder(orderId: string): Promise<IOrder> {
        if (!orderId) {
            throw new HTTPException(
                StatusCodes.BAD_REQUEST,
                "Provide Order ID"
            );
        }
        const deletedOrder = await this.orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "Order not found");
        }
        return deletedOrder;
    }
}

export default OrderService;
