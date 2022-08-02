import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Transform } from "class-transformer";
import { AddressDTO } from "@restaurant/dto/address.dto";
export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  title: string;

  @Prop()
  ceo: string;

  @Prop()
  tel: string;

  @Prop()
  city: AddressDTO["city"];

  @Prop()
  street: AddressDTO["street"];

  @Prop()
  num: AddressDTO["num"];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
