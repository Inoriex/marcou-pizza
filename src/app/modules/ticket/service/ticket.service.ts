import { createTicketDTO } from "./../dto/ticket.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket } from "../schema/ticket.schema";

@Injectable()
export class TicketService {
  constructor(@InjectModel("Ticket") private readonly ticketModel: Model<Ticket>) {}
  async getAllTicket(): Promise<Ticket[]> {
    return await this.ticketModel.find({}).exec();
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    return await this.ticketModel.findById(ticketId).exec();
  }
  async getUserTicket(userId: string, ticketId: string): Promise<Ticket> {
    return await this.ticketModel.findOne({ _id: ticketId, user: userId }).exec();
  }
  async getAllUserTickets(userId: string): Promise<Ticket[]> {
    return await this.ticketModel.find({ user: userId }).exec();
  }

  async createTicket(ticket: createTicketDTO): Promise<Ticket> {
    const newTicket = new this.ticketModel(ticket);
    return newTicket.save();
  }
}
