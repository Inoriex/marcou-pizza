import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, Types, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { Address } from "@user/schema/address.schema";
export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  title: string;

  @Prop()
  image?: string;

  @Prop()
  ceo: string;

  @Prop()
  tel: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Address" })
  @Type(() => Address)
  address: Address;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
