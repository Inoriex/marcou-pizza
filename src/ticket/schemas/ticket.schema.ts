import { User } from "@user/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { Order } from "@order/schemas/order.schema";
export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  /*  @Prop({ type: String, required: true, enum: Object.values(ticketEnum) })
  ticket: ticketEnum; */
  /* @Prop()
  num: string; */

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Order", required: true })
  @Type(() => Order)
  order: Order;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  @Type(() => User)
  user: User;

  @Prop({ default: new Date() })
  date: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
