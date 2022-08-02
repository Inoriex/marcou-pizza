import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Transform } from "class-transformer";
import { CommandeDTO } from "../dto/commande.dto";
export type CommandeDocument = Commande & Document;

@Schema()
export class Commande extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  nom: CommandeDTO["nom"];

  @Prop()
  prenom: CommandeDTO["prenom"];

  @Prop()
  prix: CommandeDTO["prix"];

  @Prop()
  description: CommandeDTO["description"];

  @Prop()
  num: CommandeDTO["num"];

  @Prop()
  tel: string;

  @Prop()
  prixtotal: string;

  @Prop()
  quantite: string;

  @Prop()
  grande: CommandeDTO["grande"];

  @Prop()
  petite: CommandeDTO["petite"];
}

export const CommandeSchema = SchemaFactory.createForClass(Commande);
