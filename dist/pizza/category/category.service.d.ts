import { Model } from "mongoose";
import { CategoryDTO } from "./dto/category.dto";
import { Category } from "./schemas/category.schema";
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    getAllCategory(): Promise<Category[]>;
    getCategory(categoryId: string): Promise<Category>;
    updateCategory(categoryId: string, category: Partial<CategoryDTO>): Promise<Category>;
    deleteCategory(categoryId: string): Promise<Category>;
    createCategory(category: CategoryDTO): Promise<Category>;
}
