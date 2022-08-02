import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform, Type } from "class-transformer";
import { MinLength } from "class-validator";
import { IAddress } from "../interfaces/address.interface";
import mongoose, { Document, ObjectId, Types, Schema as MongooseSchema } from "mongoose";
import { genderEnum } from "@user/enums/gender.enum";
import { roleEnum } from "@user/enums/role.enum";
import { statusEnum } from "@user/enums/status.enum";

export type UserDocument = User & Document;
export type AddressDocument = Address & Document;

@Schema()
export class Address extends Document {
  @Prop({ required: true })
  country: string;
  @Prop()
  city: string;
  @Prop()
  addressLine1: string;
  @Prop()
  addressLine2: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class User {
  static passwordMinLength = 7;

  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: String, enum: Object.values(statusEnum), default: statusEnum.pending })
  status: statusEnum;

  @Prop({ default: null })
  avatar: string;
  @Prop({ default: null })
  avatarId: string;
  @Prop()
  lastName: string;
  @Prop()
  firstName: string;
  @Prop({ type: String, required: true, enum: Object.values(genderEnum) })
  gender: genderEnum;
  @Prop()
  phone: string;
  @Prop({ type: [String], required: true, enum: Object.values(roleEnum) })
  roles: roleEnum;

  @Prop()
  @MinLength(User.passwordMinLength)
  @Exclude()
  password: string;

  @Prop({ type: AddressSchema })
  address: IAddress;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
