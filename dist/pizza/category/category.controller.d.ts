import { CategoryDTO } from "./dto/category.dto";
import { CategoryService } from "./category.service";
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getCompanies(res: any, req: any): Promise<any>;
    getCategory(res: any, categoryId: any): Promise<any>;
    createCategory(res: any, categoryDTO: CategoryDTO): Promise<any>;
    updateCategory(res: any, categoryDTO: Partial<CategoryDTO>, categoryId: any): Promise<any>;
    archiveCategory(res: any, categoryId: any): Promise<any>;
}
