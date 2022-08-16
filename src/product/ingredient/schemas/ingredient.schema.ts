import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { Exclude, Transform, Type } from "class-transformer";
import { ingredientEnum } from "@ingredient/enums/ingredient.enum";
import { productEnum } from "@category/enums/product-type.enum";

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ unique: true })
  name: string;

  @Prop({ type: [String], enum: Object.values(productEnum) })
  productType: [productEnum];

  @Prop({ type: String, enum: Object.values(ingredientEnum) })
  category: ingredientEnum;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
