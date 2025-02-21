import ProductModel from "@/models/products.model";
import {
  IProductRes,
  IProduct,
  IProductUpdate,
} from "@/interfaces/product.interface";
import { isEmpty } from "@/utils/util";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { IProductData } from "@/schemas/product.validation.schema";

class ProductService {
  private productModel = ProductModel;

  public getALlProducts = async (
    limit: number,
    page: number,
  ): Promise<IProductRes> => {
    const nextPage = (page - 1) * limit;
    const products = await this.productModel
      .find()
      .skip(nextPage)
      .limit(limit)
      .populate("category", "createdBy");
    const totalProducts = await this.productModel.countDocuments();
    return {
      product: products,
      currentPage: page,
      totalPage: Math.ceil(totalProducts / limit),
      totalNoOfProducts: totalProducts,
    };
  };

  public getProductById = async (productId: string): Promise<IProduct> => {
    if (isEmpty(productId)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Product ID");
    }
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Product Not Found");
    }
    return product;
  };

  public createProduct = async (
    userId: string,
    productData: IProductData,
  ): Promise<IProduct> => {
    if (!userId && isEmpty(productData)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Product Data");
    }
    const newProduct = this.productModel.create({
      createdBy: userId,
      productData,
    });
    return newProduct;
  };

  public deleteProduct = async (productId: string): Promise<IProduct> => {
    if (!productId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Product ID");
    }
    const product = await this.productModel.findByIdAndDelete(productId);
    if (!product) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Product not found");
    }
    return product;
  };

  public updateProduct = async (
    productId: string,
    productUpdateData: IProductUpdate,
  ): Promise<IProduct> => {
    if (!productId && isEmpty(productUpdateData)) {
      throw new HTTPException(
        StatusCodes.BAD_REQUEST,
        "Provide Product Update Data",
      );
    }
    const upadatedProduct = await this.productModel
      .findByIdAndUpdate(productId, productUpdateData, { new: true })
      .populate("category", "createdBy");
    if (!upadatedProduct) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Product not found");
    }
    return upadatedProduct;
  };
}

export default ProductService;
