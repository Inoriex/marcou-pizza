import { IngredientDTO } from "@product/ingredient/dto/ingredient.dto";
import { IngredientService } from "@product/ingredient/ingredient.service";
export declare class IngredientController {
    private ingredientService;
    constructor(ingredientService: IngredientService);
    getCompanies(res: any, req: any): Promise<any>;
    getIngredient(res: any, ingredientId: any): Promise<any>;
    createIngredient(res: any, ingredientDTO: IngredientDTO): Promise<any>;
    updateIngredient(res: any, ingredientdto: Partial<IngredientDTO>, ingredientId: any): Promise<any>;
    archiveIngredient(res: any, ingredientId: any): Promise<any>;
}
