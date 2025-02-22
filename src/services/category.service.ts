import HTTPException from "@/exceptions/http.exception";
import ICategory from "@/interfaces/category.interface";
import CategoryModel from "@/models/category.model";
import { ICategoryData } from "@/schemas/category.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";


class CategoryService {
    private categoryModel = CategoryModel;

    public createCategory = async (categoryData: ICategoryData): Promise<ICategory> => {
        if (isEmpty(categoryData)) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Category Data");
        }
        const newCategory = await this.categoryModel.create(categoryData);
        return newCategory;
    };

    public deleteCategory = async (categoryId: string): Promise<ICategory> => {
        if (!categoryId) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Category ID");
        }
        const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "Category not found");
        }
        return deletedCategory;
    }
}


export default CategoryService;
