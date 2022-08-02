import { ticketEnum } from "../enums/ticket.enums";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Transform } from "class-transformer";

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ type: String, required: true, enum: Object.values(ticketEnum) })
  gender: ticketEnum;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
