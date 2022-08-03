import { User } from "@user/schema/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  /*  @Prop({ type: String, required: true, enum: Object.values(ticketEnum) })
  ticket: ticketEnum; */

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Order" })
  @Type(() => Order)
  order: Order;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  @Type(() => User)
  user: User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
