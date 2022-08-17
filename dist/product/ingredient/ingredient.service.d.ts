import { Model } from "mongoose";
import { IngredientDTO } from "./dto/ingredient.dto";
import { Ingredient } from "./schemas/ingredient.schema";
export declare class IngredientService {
    private readonly ingredientModel;
    constructor(ingredientModel: Model<Ingredient>);
    getAllIngredient(): Promise<Ingredient[]>;
    getIngredient(ingredientId: string): Promise<Ingredient>;
    updateIngredient(ingredientId: string, ingredient: Partial<IngredientDTO>): Promise<Ingredient>;
    deleteIngredient(ingredientId: string): Promise<Ingredient>;
    createIngredient(ingredient: IngredientDTO): Promise<Ingredient>;
}
