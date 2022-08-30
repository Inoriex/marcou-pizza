import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { User } from "@user/schemas/user.schema";

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({default: 'Addresse 1'})
  name: string;

  @Prop()
  city: string;

  @Prop()
  zip: string;

  @Prop({default: 'France'})
  country: string;

  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  @Type(() => User)
  user: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
