import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { PizzaDTO } from "../dto/pizza.dto";
import { PizzaService } from "../service/pizza.service";

// Localhost:3000/pizza/
@Controller("api/pizza")
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  @UseGuards(JwtAuthGuard)
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

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created pizza successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createPizza(@Res() res, @Body() pizzadto: PizzaDTO) {
    const pizza = await this.pizzaService.createPizza(pizzadto);
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been created successfully",
      data: pizza,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put("/:pizzaId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "pizza updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updatePizza(@Res() res, @Body() pizzadto: Partial<PizzaDTO>, @Param("pizzaId") pizzaId) {
    const pizza = await this.pizzaService.updatePizza(pizzaId, pizzadto);
    return res.status(HttpStatus.OK).json({
      message: "Pizza has been updated successfully",
      data: pizza,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
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
