import { Router } from "express";
import ProductController from "@/controllers/product.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";


class ProductRoutes implements Routes {
  public path = "/product";
  public router = Router();
  private productController = new ProductController();

  constructor() {
    this.inizializeRoutes();
  }

  private inizializeRoutes = () => {
    this.router.get(this.path + "s", [authMiddleware], this.productController.getAllProducts)
  }
}
