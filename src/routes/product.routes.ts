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
        this.router.get(
            this.path + "s",
            [authMiddleware],
            this.productController.getAllProducts
        );

        // get a single product route
        this.router.get(
            this.path + "/:productId",
            [authMiddleware],
            this.productController.getProductsById
        );

        // create a new product route
        this.router.post(
            this.path + "/create-product",
            [authMiddleware],
            this.productController.createProduct
        );

        // update a product
        this.router.put(
            this.path + "/:productId",
            [authMiddleware],
            this.productController.updateProduct
        );

        // delelte a product
        this.router.delete(
            this.path + "/:productId",
            [authMiddleware],
            this.productController.deleteProduct
        );

        // review product
        this.router.post(
            this.path + "/review-product/:productId",
            [authMiddleware],
            this.productController.reviewProduct
        )
    };
}

export default ProductRoutes;
