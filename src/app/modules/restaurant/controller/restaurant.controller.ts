import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, ValidationPipe, Res, UseGuards, Logger, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RestaurantService } from "@restaurant/service/restaurant.service";
import { RestaurantDTO } from "@restaurant/dto/restaurant.dto";
import { IUser } from "@user/interfaces/user.interface";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { UserService } from "@user/service/user.service";
import MongooseClassSerializerInterceptor from "@/utils/mongooseClassSerializer.interceptor";
import { Restaurant } from "@restaurant/schema/restaurant.schema";

// Localhost:3000/pizzas/
@ApiTags("api/restaurant")
@Controller("api/restaurant")
@UseInterceptors(MongooseClassSerializerInterceptor(Restaurant))
export class RestaurantController {
  constructor(private restaurantService: RestaurantService, private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/pizzas/list
  @Get("/restaurant")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Récupération de l'address OK 👌 " })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'adresse" })
  async getAddress(@Res() res, @Req() req) {
    const address = await this.restaurantService.getAllRestaurant();
    return res.status(HttpStatus.OK).json({
      message: "l’adresse a été récupéré avec succès ",
      data: address,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created address successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createAddress(@GetUser() user: IUser, @Res() res, @Body() restaurantDTO: RestaurantDTO) {
    const address = await this.userService.createAddress(restaurantDTO.address, user._id);
    const restaurant = await this.restaurantService.createRestaurant({ ...restaurantDTO, address: address._id });
    return res.status(HttpStatus.OK).json({
      message: "L’adresse a été récupéré avec succès ",
      data: restaurant,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put("/:restaurantId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "L'adresse a été updated avec succès" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "impossible de récupérer les détails de l'address" })
  async updateRestaurant(@Res() res, @Body() restaurantDTO: Partial<RestaurantDTO>, @Param("restaurantId") restaurantId) {
    const restaurant = await this.restaurantService.updateRestaurant(restaurantId, restaurantDTO);
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
