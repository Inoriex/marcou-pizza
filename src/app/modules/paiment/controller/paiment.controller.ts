import { PaimentService } from "../service/paiment.service";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, ValidationPipe, Res, UseGuards, Logger, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiTags, ApiPayloadTooLargeResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { IUser } from "@user/interfaces/user.interface";

@ApiTags("api/paiment")
@Controller("api/paiment")
export class ticketController {
  constructor(private paimentService: PaimentService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @ApiOkResponse({ description: "Récupération du paiment OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de récupéré le paiment" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails du paiment" })
  async getPaiment(@Res() res, @Req() req) {
    const paiment = await this.paimentService.getAllPaiment();
    return res.status(HttpStatus.OK).json({
      message: "le paiment a été récupéré avec succès",
      data: paiment,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Création du paiment OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de créer le paiment" })
  @ApiInternalServerErrorResponse({ description: "impossible de créer le paiment" })
  async createPaiment(@GetUser() paiment: string, @Res() res, @Req() req) {
    const newPaiment = await this.paimentService.createPaiment(paiment);
    return res.status(HttpStatus.OK).json({
      message: "le paiment a été crée avec succès",
      data: newPaiment,
    });
  }
}
