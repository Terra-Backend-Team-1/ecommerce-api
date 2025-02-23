import OrderController from "@/controllers/order.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { orderValidationSchema } from "@/schemas/order.validation.schema";
import { Router } from "express";

class OrderRoutes implements Routes {
    public path = "/orders";
    public router = Router();
    public orderController = new OrderController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // get all orders route
        this.router.get(
            `${this.path}`,
            authMiddleware,
            this.orderController.getOrders
        );
        // get user orders route
        this.router.get(
            `${this.path}/user`,
            authMiddleware,
            this.orderController.getUserOrders
        );
        // get order by id route
        this.router.get(
            `${this.path}/:id`,
            [authMiddleware],
            this.orderController.getOrderById
        );
        // create order route
        this.router.post(
            `${this.path}`,
            [
                authMiddleware,
                validationMiddleware(orderValidationSchema, "body"),
            ],
            this.orderController.createOrder
        );
        // update order route
        this.router.put(
            `${this.path}/:id`,
            [
                authMiddleware,
                validationMiddleware(orderValidationSchema, "body"),
            ],
            this.orderController.updateOrder
        );
        // delete order route
        this.router.delete(
            `${this.path}/:id`,
            this.orderController.deleteOrder
        );
    }
}

export default OrderRoutes;
