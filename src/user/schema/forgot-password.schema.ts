import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { User } from "@user/schema/user.schema";
import { IsEmail, IsNotEmpty } from "class-validator";

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class ForgotPassword {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Prop({ default: false })
  firstUsed: boolean;
  @Prop({ default: false })
  finalUsed: boolean;
  @Prop()
  expires: Date;
  @Prop()
  ip: string;
  @Prop()
  browser: string;
  @Prop()
  country: string;
  @Prop()
  ipChanged: string;
  @Prop()
  browserChanged: string;
  @Prop()
  countryChanged: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  @Type(() => User)
  user: User;
}

export const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);
