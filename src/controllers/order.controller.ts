import { RequestWithUser } from "@/interfaces/auth.interface";
import OrderService from "@/services/order.service";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

class OrderController {
    private orderService = new OrderService();
    private defaultLimit = 10;
    private defaultPage = 1;

    // create order controller
    public createOrder = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(StatusCodes.CREATED).json({
                data: order,
                message: "order created",
            });
        } catch (error) {
            next(error);
        }
    };

    // get orders controller
    public getOrders = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { limit, page } = req.query;
            const orders = await this.orderService.getOrders(
                Number(limit || this.defaultLimit),
                Number(page || this.defaultPage)
            );
            res.status(StatusCodes.OK).json({ data: orders });
        } catch (error) {
            next(error);
        }
    };

    // get user orders controller
    public getUserOrders = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { limit, page } = req.query;
            const userId = req.user?.id;
            const orders = await this.orderService.getUserOrders(
                userId,
                Number(limit || this.defaultLimit),
                Number(page || this.defaultPage)
            );
            res.status(StatusCodes.OK).json({
                data: orders,
                message: "User orders",
            });
        } catch (error) {
            next(error);
        }
    };

    // get order by id controller
    public getOrderById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            res.status(StatusCodes.OK).json({ data: order });
        } catch (error) {
            next(error);
        }
    };

    // update order controller
    public updateOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const order = await this.orderService.updateOrder(req.body, id);
            res.status(StatusCodes.OK).json({
                data: order,
                message: "Order updated",
            });
        } catch (error) {
            next(error);
        }
    };

    // delete order controller
    public deleteOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const order = await this.orderService.deleteOrder(id);
            res.status(StatusCodes.OK).json({
                data: order,
                message: "Order deleted",
            });
        } catch (error) {
            next(error);
        }
    };
}

export default OrderController;
