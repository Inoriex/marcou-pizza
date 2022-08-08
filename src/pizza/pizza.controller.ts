import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards, Logger } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { PizzaDTO } from "@pizza/dto/pizza.dto";
import { PizzaService } from "@pizza/pizza.service";
import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@auth/decorators/roles.decorator";

// Localhost:3000/pizza/
@ApiTags("api/pizza")
@Controller("api/pizza")
@UseGuards(RolesGuard)
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/pizza/list
  @Get("/list")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Pizza has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch pizza details" })
  async getCompanies(@Res() res, @Req() req) {
    const pizza = await this.pizzaService.getAllPizza();
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been successfully fetched",
      data: pizza,
    });
  }

  @Get("/:pizzaId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "pizza fetched successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async getPizza(@Res() res, @Param("pizzaId") pizzaId) {
    const pizza = await this.pizzaService.getPizza(pizzaId);
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been fetched successfully",
      data: pizza,
    });
  }

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created pizza successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createPizza(@Res() res, @Body() pizzaDTO: PizzaDTO) {
    Logger.log(pizzaDTO);
    const pizza = await this.pizzaService.createPizza(pizzaDTO);
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been created successfully",
      data: pizza,
    });
  }

  @Put("/:pizzaId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "pizza updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updatePizza(@Res() res, @Body() pizzaDTO: Partial<PizzaDTO>, @Param("pizzaId") pizzaId) {
    const pizza = await this.pizzaService.updatePizza(pizzaId, pizzaDTO);
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been updated successfully",
      data: pizza,
    });
  }

  @Delete("/:pizzaId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "pizza updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async archivePizza(@Res() res, @Param("pizzaId") pizzaId) {
    const pizza = await this.pizzaService.deletePizza(pizzaId);
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been purged successfully",
      data: pizza,
    });
  }
}
