import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform, Type } from "class-transformer";
import { MinLength, MaxLength } from "class-validator";
import mongoose, { Document, ObjectId, Types, Schema as MongooseSchema } from "mongoose";
import { genderEnum } from "@user/enums/gender.enum";
import { roleEnum } from "@user/enums/role.enum";
import { Address } from "./address.schema";
import * as bcrypt from "bcrypt";
import * as validator from "validator";

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  static passwordMinLength = 7;

  @Transform(({ value }) => value.toString())
  _id: string;

  @MinLength(6)
  @MaxLength(255)
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  avatarId: string;

  @Prop({required: true})
  @MinLength(2)
  @MaxLength(255)
  lastName: string;

  @MinLength(2)
  @MaxLength(255)
  @Prop({ type: String, required: true})
  firstName: string;

  @Prop({ type: String, required: true, enum: Object.values(genderEnum) })
  gender: genderEnum;

  @Prop()
  phone: string;

  @Prop({ type: [String], required: true, enum: Object.values(roleEnum), default: ["user"] })
  roles: roleEnum;

  @Prop({ validate: validator.isUUID })
  verification: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: new Date() })
  verificationExpires: Date;

  @Prop({ default: 0 })
  loginAttemps: number;

  @Prop({ default: new Date() })
  blockExpires: Date;

  @Prop({required: true})
  @MinLength(User.passwordMinLength)
  @Exclude()
  password: string;

  @Prop({
    type: [{ address: { type: MongooseSchema.Types.ObjectId, ref: "Address" } }],
  })
  addresses: { address: Address }[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ firstName: "text", lastName: "text" });

UserSchema.virtual("fullName").get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    // tslint:disable-next-line:no-string-literal
    const hashed = await bcrypt.hash(this["password"], 10);
    // tslint:disable-next-line:no-string-literal
    this["password"] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
