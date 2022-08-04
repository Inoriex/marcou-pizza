import { Ticket } from "../../ticket/schema/ticket.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
// import { PaimentDTO } from "../dto/paiment.dto";
export type PaimentDocument = Paiment & Document;

@Schema()
export class Paiment extends Document {
  @Transform(({ value }) => value.tostring())
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Ticket" })
  @Type(() => Ticket)
  ticketId: Ticket;

  @Prop()
  date: Date;

  @Prop()
  num: string;
}

export const PaimentSchema = SchemaFactory.createForClass(Paiment);
