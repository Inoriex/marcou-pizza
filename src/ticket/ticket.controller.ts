import { createTicketDTO } from "./dto/ticket.dto";
import { User } from "@user/interfaces/user.interface";
import { Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { TicketService } from "./ticket.service";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { roleEnum } from "@user/enums/role.enum";
import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@auth/decorators/roles.decorator";

@ApiTags("api/ticket")
@Controller("api/ticket")
@UseGuards(RolesGuard)
export class TicketController {
  constructor(private ticketService: TicketService) {}

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

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le ticket" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le ticket" })
  async createTicket(@GetUser() user: User, ticket: createTicketDTO, @Res() res, @Req() req) {
    const newTicket = await this.ticketService.createTicket({ ...ticket, userId: user._id });
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été crée avec succès",
      data: newTicket,
    });
  }

  @Get("/:ticketId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le ticket" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le ticket" })
  async getUserTicket(@GetUser() user: User, @Param("ticketId") ticketId, @Res() res, @Req() req) {
    const userTicket = await this.ticketService.getUserTicket(user._id, ticketId);
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été crée avec succès",
      data: userTicket,
    });
  }

  @Get("/userTickets")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du ticket OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le ticket" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le ticket" })
  async getAllUserTicket(@GetUser() user: User, @Res() res, @Req() req) {
    const userTickets = await this.ticketService.getAllUserTickets(user._id);
    return res.status(HttpStatus.OK).json({
      message: "le ticket a été crée avec succès",
      data: userTickets,
    });
  }
}
