import { Router } from "express";
import CategoryController from "@/controllers/category.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";


class CategoryRouter implements Routes {
    public path = "/category";
    public router = Router();
    private categoryController = new CategoryController();

    constructor() {
        this.inizilizeRoutes();
    }

    private inizilizeRoutes = () => {
        this.router.post(this.path, [authMiddleware], this.categoryController.createCategory)
    }
}

export default CategoryRouter;
