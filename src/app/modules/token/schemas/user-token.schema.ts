import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types, Schema as MongooseSchema } from "mongoose";
import { User } from "@user/schema/user.schema";

export type TokenDocument = Token & mongoose.Document;

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop()
  token: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  uId: User;
  @Prop()
  expireAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
