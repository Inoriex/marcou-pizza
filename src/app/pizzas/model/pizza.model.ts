import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types, Schema as MongooseSchema } from "mongoose";
import { CategoryDTO } from "../categories/dto/category.dto";
import { IngredientsDTO } from "../dto/ingredients.dto";

export type PizzaDocument = Pizza & mongoose.Document;

@Schema({ timestamps: true })
export class Pizza extends Document {
  @Prop()
  name: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Category" })
  category: CategoryDTO;
  @Prop()
  image?: string;
  @Prop()
  price_P: number;
  @Prop()
  price_G: number;
  @Prop()
  description?: number;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Ingredients" })
  ingredients: IngredientsDTO[];
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
