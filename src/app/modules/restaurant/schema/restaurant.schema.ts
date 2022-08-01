import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Transform } from "class-transformer";

export type AddressDocument = Address & Document;

@Schema()
export class Address extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  num: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Address);
