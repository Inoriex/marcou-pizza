import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket } from "../schema/ticket.schema";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

@Injectable()
export class TicketService {
  constructor(@InjectModel("Ticket") private readonly ticketModel: Model<Ticket>) {}
  async getAllTicket(): Promise<Ticket[]> {
    return await this.ticketModel.find({}).exec();
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    return await this.ticketModel.findById(ticketId);
  }

  async ticketCommercant(createTicketCm: string): Promise<AppModule> {
    return await NestFactory.create(createTicketCm);
  }
}
