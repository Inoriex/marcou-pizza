import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IngredientDTO } from "./dto/ingredient.dto";
import { Ingredient } from "./schemas/ingredient.schema";

@Injectable()
export class IngredientService {
  constructor(@InjectModel("Ingredient") private readonly ingredientModel: Model<Ingredient>) {}
  async getAllIngredient(): Promise<Ingredient[]> {
    return await this.ingredientModel.find({}).exec();
    // OR findOne(ingredient => ingredient.name === ingredientName);
  }

  // Get ingredient by id
  async getIngredient(ingredientId: string): Promise<Ingredient> {
    return await this.ingredientModel.findById(ingredientId);
  }
  // Update ingredient with Id
  async updateIngredient(ingredientId: string, ingredient: Partial<IngredientDTO>): Promise<Ingredient> {
    return await this.ingredientModel.findByIdAndUpdate(ingredientId, ingredient, { new: true });
  }
  // Delete ingredient with Id
  async deleteIngredient(ingredientId: string): Promise<Ingredient> {
    return await this.ingredientModel.findByIdAndUpdate(ingredientId, { active: false });
  }
  // Create ingredient
  async createIngredient(ingredient: IngredientDTO): Promise<Ingredient> {
    const existingIngredient = await this.ingredientModel.find({ name: ingredient.name }).exec();
    // Check not exist ingredient
    if (existingIngredient && existingIngredient.length > 0) {
      return existingIngredient[0];
    }
    const newIngredient = new this.ingredientModel(ingredient);
    return await newIngredient.save();
  }
}
