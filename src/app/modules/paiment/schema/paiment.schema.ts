import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Transform } from "class-transformer";
import { PaimentDTO } from "../dto/paiment.dto";
export type PaimentDocument = Paiment & Document;

@Schema()
export class Paiment extends Document {
  @Transform(({ value }) => value.tostring())
  _id: string;

  @Prop()
  prix: string;

  @Prop()
  ticketclient: PaimentDTO["ticketclient"];

  @Prop()
  ticketcommercant: PaimentDTO["ticketcommercant"];

  @Prop()
  ville: string;

  @Prop()
  nomboutique: PaimentDTO["nomboutique"];

  @Prop()
  date: string;

  @Prop()
  num: string;

  @Prop()
  quantité: string;

  @Prop()
  totalprix: string;
}

export const PaimentSchema = SchemaFactory.createForClass(Paiment);
