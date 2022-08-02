import { TicketService } from "./../service/ticket.service";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, RequestMethod, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { TicketService } from "../service/ticket.service";
import { RestaurantService } from "../../restaurant/service/restaurant.service";

// Localhost:3000/pizzas/
@Controller("ticket")
export class TicketController {
  contructor(private ticketService: TicketService) {}

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
}
