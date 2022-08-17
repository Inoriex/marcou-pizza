import mongoose, { Document } from "mongoose";
import { Category } from "@pizza/category/schemas/category.schema";
import { Ingredient } from "@pizza/ingredient/schemas/ingredient.schema";
export declare type PizzaDocument = Pizza & mongoose.Document;
export declare class Pizza extends Document {
    _id: string;
    name: string;
    image?: string;
    price_P: number;
    price_G: number;
    description?: number;
    dispo: boolean;
    category: Category;
    ingredients: Ingredient[];
}
export declare const PizzaSchema: mongoose.Schema<Pizza, mongoose.Model<Pizza, any, any, any, any>, {}, {}, {}, {}, "type", Pizza>;
