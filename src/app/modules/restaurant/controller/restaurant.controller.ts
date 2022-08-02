import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, RequestMethod, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RestaurantService } from "@restaurant/service/restaurant.service";
import { AddressDTO } from "@restaurant/dto/address.dto";

// Localhost:3000/pizzas/
@Controller("restaurant")
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/pizzas/list
  @Get("/address")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération de l'address OK 👌 " })
  @ApiBadRequestResponse({ description: "Impossible de récupéré l'address" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'address" })
  async getAddress(@Res() res, @Req() req) {
    const address = await this.restaurantService.getAllAddress();
    return res.status(HttpStatus.OK).json({
      message: "l’address a été récupéré avec succès ",
      data: address,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "L'address à étais updated avec succès" })
  @ApiBadRequestResponse({ description: "La validation des paramettre à échouer" })
  async updateAddress(@Res() res, @Body() addressDto: Partial<AddressDTO>, @Param("addressId") addressId) {
    const address = await this.restaurantService.updateAddress(addressId, addressDto);
    return res.status(HttpStatus.OK).json({
      message: "l’address a été récupéré avec succès ",
      data: address,
    });
  }
}
