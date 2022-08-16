import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, Types, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { Ingredient } from "@product/ingredient/schemas/ingredient.schema";
import { categoryEnum } from "@category/enums/category.enum";
import { productEnum } from "@category/enums/product-type.enum";

export type ProductDocument = Product & mongoose.Document;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Product extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;
  @Prop()
  name: string;
  @Prop()
  image?: string;
  @Prop()
  price_P?: number;
  @Prop()
  price_G?: number;
  @Prop()
  price?: string;
  @Prop()
  description?: string;
  @Prop({ default: true })
  dispo: boolean;

  @Prop({ type: String, enum: Object.values(categoryEnum) })
  category: categoryEnum;

  @Prop({ type: String, enum: Object.values(productEnum) })
  productType: productEnum;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: "Ingredient" }],
  })
  @Type(() => Ingredient)
  ingredients?: Ingredient[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
