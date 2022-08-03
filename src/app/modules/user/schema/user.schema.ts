import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform, Type } from "class-transformer";
import { MinLength } from "class-validator";
import { Document, ObjectId, Schema as MongooseSchema } from "mongoose";
import { genderEnum } from "@user/enums/gender.enum";
import { roleEnum } from "@user/enums/role.enum";
import { statusEnum } from "@user/enums/status.enum";
import { Address } from "./address.schema";

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Address" })
  @Type(() => Address)
  address: Address;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ firstName: "text", lastName: "text" });

UserSchema.virtual("fullName").get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});
