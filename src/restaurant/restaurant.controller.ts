import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards, Logger } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RestaurantService } from "@restaurant/restaurant.service";
import { RestaurantDTO } from "@restaurant/dto/restaurant.dto";
import { User } from "@user/interfaces/user.interface";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { UserService } from "@user/user.service";
import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@auth/decorators/roles.decorator";

// Localhost:3000/pizzas/
@ApiTags("api/restaurant")
@Controller("api/restaurant")
@UseGuards(RolesGuard)
export class RestaurantController {
  constructor(private restaurantService: RestaurantService, private readonly userService: UserService) {}

  // middleware qui verifie le webtoken, session toujours valideF
  //localhost:3000/pizzas/list
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération de l'address OK 👌 " })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'adresse" })
  async getRestaurantsAddress(@Res() res, @Req() req, @GetUser() user) {
    console.log(req);
    const address = await this.restaurantService.getAllRestaurant();
    return res.status(HttpStatus.OK).json({
      message: "l’adresse a été récupéré avec succès ",
      data: address,
    });
  }
  @Get("/:restaurantId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération de l'address OK 👌 " })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'adresse" })
  async getRestaurantAddress(@Res() res, @Req() req, @Param("restaurantId") restaurantId) {
    const address = await this.restaurantService.getRestaurant(restaurantId);
    return res.status(HttpStatus.OK).json({
      message: "l’adresse a été récupéré avec succès ",
      data: address,
    });
  }

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created address successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createAddress(@GetUser() user: User, @Res() res, @Body() restaurantDTO: RestaurantDTO) {
    const address = await this.userService.createAddress(restaurantDTO.address);
    const restaurant = await this.restaurantService.createRestaurant({ ...restaurantDTO, address: address._id });
    return res.status(HttpStatus.OK).json({
      message: "L’adresse a été récupéré avec succès ",
      data: restaurant,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Put("/:restaurantId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "L'adresse a été updated avec succès" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'address" })
  async updateRestaurant(@Res() res, @Body() restaurantDTO: Partial<RestaurantDTO>, @GetUser() user, @Param("restaurantId") restaurantId) {
    const restaurant = await this.restaurantService.updateRestaurant(restaurantId, restaurantDTO, user._id);
    return res.status(HttpStatus.OK).json({
      message: "Le restaurant a été récupéré avec succès ",
      data: restaurant,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Delete("/:restaurantId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "L'adresse a été supprimé avec succès" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'address" })
  async deleteRestaurant(@Res() res, @Body() restaurantDTO: Partial<RestaurantDTO>, @Param("restaurantId") restaurantId) {
    await this.restaurantService.deleteRestaurant(restaurantId);
    return res.status(HttpStatus.OK).json({
      message: "Le restaurant a été supprimé avec succès ",
    });
  }
}
