import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { Exclude, Transform, Type } from "class-transformer";
import { MinLength } from "class-validator";
import { Address, AddressSchema } from "./address.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  static passwordMinLength = 7;

  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  @MinLength(User.passwordMinLength)
  @Exclude()
  password: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
