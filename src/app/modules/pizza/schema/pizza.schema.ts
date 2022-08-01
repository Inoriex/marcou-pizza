import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types, Schema as MongooseSchema } from "mongoose";
import { Category } from "@pizza/category/schema/category.schema";
import { IngredientDTO } from "@pizza/ingredient/dto/ingredient.dto";

export type PizzaDocument = Pizza & mongoose.Document;

@Schema({ timestamps: true })
export class Pizza extends Document {
  @Prop()
  name: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Category" })
  category: Category;
  @Prop()
  image?: string;
  @Prop()
  price_P: number;
  @Prop()
  price_G: number;
  @Prop()
  description?: number;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Ingredient" })
  ingredients: IngredientDTO[];
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
