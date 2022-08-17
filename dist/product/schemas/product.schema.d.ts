import mongoose, { Document } from "mongoose";
import { Ingredient } from "@product/ingredient/schemas/ingredient.schema";
import { categoryEnum } from "@category/enums/category.enum";
import { productEnum } from "@category/enums/product-type.enum";
export declare type ProductDocument = Product & mongoose.Document;
export declare class Product extends Document {
    _id: string;
    name: string;
    image?: string;
    price_P?: number;
    price_G?: number;
    price?: string;
    description?: string;
    dispo: boolean;
    category: categoryEnum;
    productType: productEnum;
    ingredients?: Ingredient[];
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, "type", Product>;
