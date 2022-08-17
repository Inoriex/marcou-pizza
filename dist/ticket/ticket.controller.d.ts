import { createTicketDTO } from "./dto/ticket.dto";
import { User } from "@user/interfaces/user.interface";
import { TicketService } from "./ticket.service";
export declare class TicketController {
    private ticketService;
    constructor(ticketService: TicketService);
    getTicket(res: any, req: any): Promise<any>;
    createTicket(user: User, ticket: createTicketDTO, res: any, req: any): Promise<any>;
    getUserTicket(user: User, ticketId: any, res: any, req: any): Promise<any>;
    getAllUserTicket(user: User, res: any, req: any): Promise<any>;
}
