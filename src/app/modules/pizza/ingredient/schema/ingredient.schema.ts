import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { Exclude, Transform, Type } from "class-transformer";

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true })
  name: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
