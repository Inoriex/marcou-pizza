import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, RequestMethod, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/app/auth/guards/jwt-auth.guard";
import { RestaurantService } from "../service/restaurant.service";
import { AddressDTO } from "../dto/adresse.dto";

// Localhost:3000/pizzas/
@Controller("restaurant")
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/pizzas/list
  @Get("/adresse")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération de l'adresse OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de récupéré l'adresse" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'adresse" })
  async getAddress(@Res() res, @Req() req) {
    const address = await this.restaurantService.getAllAddress();
    return res.status(HttpStatus.OK).json({
      message: "l’adresse a été récupéré avec succès ",
      data: address,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "L'adresse à étais updated avec succès" })
  @ApiBadRequestResponse({ description: "La validation des paramettre à échouer" })
  async updateAddress(@Res() res, @Body() addressdto: Partial<AddressDTO>, @Param("addressId") AddressId) {
    const address = await this.restaurantService.updateAddress(AddressId, addressdto);
    return res.status(HttpStatus.OK).json({
      message: "l’adresse a été récupéré avec succès ",
      data: address,
    });
  }
}
