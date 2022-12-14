import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, Types, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { Address } from "@user/schemas/address.schema";
export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  ceo: string;

  @Prop({ required: true })
  tel: string;

  @Prop()
  horaires: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Address" })
  @Type(() => Address)
  address: Address;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
