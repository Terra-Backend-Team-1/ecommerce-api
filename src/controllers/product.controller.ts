import ProductService from "@/services/product.service";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { StatusCodes } from "http-status-codes";

class ProductController {
    private productService = new ProductService();

    // get all Products
    public getAllProducts = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const products = await this.productService.getALlProducts(
                limit,
                page
            );
            res.status(StatusCodes.OK).json({ data: products });
        } catch (error) {
            next(error);
        }
    };

    // get a single product
    public getProductsById = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const productId = req.params.productId;
            const product = await this.productService.getProductById(productId);
            res.status(StatusCodes.OK).json({ data: product });
        } catch (error) {
            next(error);
        }
    };

    // create an new product
    public createProduct = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const productData = req.body;
            const userId = req.user?._id;
            const newProduct = await this.productService.createProduct(
                userId,
                productData
            );
            res.status(StatusCodes.CREATED).json({
                data: newProduct,
                message: "Product Created Sucessfully",
            });
        } catch (error) {
            next(error);
        }
    };

    // update a product
    public updateProduct = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const upadateData = req.body;
            const productId = req.params.productId;
            const updateProduct = await this.productService.updateProduct(
                productId,
                upadateData
            );
            res.status(StatusCodes.CREATED).json({
                data: updateProduct,
                message: "Product Updated Sucessfully",
            });
        } catch (error) {
            next(error);
        }
    };

    // delete a product
    public deleteProduct = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const productId = req.params.productId;
            await this.productService.deleteProduct(productId);
            res.status(StatusCodes.NO_CONTENT).json({
                message: "Product Deleted Sucessfully",
            });
        } catch (error) {
            next(error);
        }
    };

    // review products
    public reviewProduct = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user?._id;
            const productId = req.params.productId;
            const review = req.body;
            const product = await this.productService.reviewProduct(
                productId,
                review,
                userId
            );
            res.status(StatusCodes.CREATED).json({ data: product });
        } catch (error) {
            next(error);
        }
    };
}

export default ProductController;
