import { createTicketDTO } from "./dto/ticket.dto";
import { Model } from "mongoose";
import { Ticket } from "./schemas/ticket.schema";
export declare class TicketService {
    private readonly ticketModel;
    constructor(ticketModel: Model<Ticket>);
    getAllTicket(): Promise<Ticket[]>;
    getTicket(ticketId: string): Promise<Ticket>;
    getUserTicket(userId: string, ticketId: string): Promise<Ticket>;
    getAllUserTickets(userId: string): Promise<Ticket[]>;
    createTicket(ticket: createTicketDTO): Promise<Ticket>;
}
