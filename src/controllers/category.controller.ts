import CategoryService from "@/services/category.service";
import { Request, Response, NextFunction } from "express"
import { RequestWithUser } from "@/interfaces/auth.interface";
import { StatusCodes } from "http-status-codes";

class CategoryController {
    private categoryService = new CategoryService();

    public createCategory = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const categoryData = req.body;
            const category = await this.categoryService.createCategory(categoryData);
            res.status(StatusCodes.CREATED).json({ data: category, message: "Catergory created sucesfullly" });
        } catch (error) {
            next(error)
        }
    }
}


export default CategoryController;
