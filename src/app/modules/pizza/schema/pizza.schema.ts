import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, Types, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { Category } from "@pizza/category/schema/category.schema";
import { Ingredient } from "@pizza/ingredient/schema/ingredient.schema";

export type PizzaDocument = Pizza & mongoose.Document;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Pizza extends Document {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  name: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category: Category;
  @Prop()
  image?: string;
  @Prop()
  price_P: number;
  @Prop()
  price_G: number;
  @Prop()
  description?: number;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Ingredient.name }],
  })
  @Type(() => Ingredient)
  ingredients: Ingredient[];
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
