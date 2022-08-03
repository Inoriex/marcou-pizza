import { createTicketDTO } from "./../dto/ticket.dto";
import { IUser } from "@user/interfaces/user.interface";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, RequestMethod, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { TicketService } from "../service/ticket.service";
import { GetUser } from "@/components/decorators/get-user.decorator";

// Localhost:3000/pizzas/
@Controller("api/ticket")
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/pizzas/list
  @Get("/ticket")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de récupéré du tickets" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails du ticket" })
  async getTicket(@Res() res, @Req() req) {
    const ticket = await this.ticketService.getAllTicket();
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été récupéré avec succès",
      data: ticket,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post("/ticket")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de récupéré du tickets" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails du ticket" })
  async createTicket(@GetUser() user: IUser, ticket: createTicketDTO, @Res() res, @Req() req) {
    const ticketCm = await this.ticketService.createTicket({ ...ticket, ticket: "commercant", userId: user._id });
    const ticketCl = await this.ticketService.createTicket({ ...ticket, ticket: "client", userId: user._id });
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été récupéré avec succès",
      data: ticketCm,
      ticketCl,
    });
  }
}
