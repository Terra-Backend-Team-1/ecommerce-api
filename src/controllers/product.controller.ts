import ProductService from "@/services/product.service";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { StatusCodes } from "http-status-codes";


class ProductController {
  private productService = new ProductService();

  public getAllProducts = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const products = await this.productService.getALlProducts(limit, page);
      res.status(StatusCodes.OK).json({ data: products });
    } catch (error) {
      next(error);
    }
  }
};


export default ProductController;
