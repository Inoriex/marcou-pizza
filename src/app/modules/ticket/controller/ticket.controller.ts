import { createTicketDTO } from "./../dto/ticket.dto";
import { IUser } from "@user/interfaces/user.interface";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, RequestMethod, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { TicketService } from "../service/ticket.service";
import { GetUser } from "@/components/decorators/get-user.decorator";

@ApiTags("api/ticket")
@Controller("api/ticket")
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/pizzas/list
  @Get("/all")
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
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le ticket" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le ticket" })
  async createTicket(@GetUser() user: IUser, ticket: createTicketDTO, @Res() res, @Req() req) {
    const newTicket = await this.ticketService.createTicket({ ...ticket, userId: user._id });
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été crée avec succès",
      data: newTicket,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:ticketId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le ticket" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le ticket" })
  async getUserTicket(@GetUser() user: IUser, @Param("ticketId") ticketId, @Res() res, @Req() req) {
    const userTicket = await this.ticketService.getUserTicket(user._id, ticketId);
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été crée avec succès",
      data: userTicket,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get("/userTickets")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le ticket" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le ticket" })
  async getAllUserTicket(@GetUser() user: IUser, @Res() res, @Req() req) {
    const userTickets = await this.ticketService.getAllUserTickets(user._id);
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été crée avec succès",
      data: userTickets,
    });
  }
}
