import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { IngredientDTO } from "@pizza/ingredient/dto/ingredient.dto";
import { IngredientService } from "@pizza/ingredient/service/ingredient.service";
import { ValidateObjectId } from "@pizza/pipe/id.pipe";

//localhost:3000/api/ingredient/
@Controller("api/ingredient")
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/list")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Ingredient has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch ingredient details" })
  async getCompanies(@Res() res, @Req() req) {
    const ingredient = await this.ingredientService.getAllIngredient();
    return res.status(HttpStatus.OK).json({
      message: "Ingredient has been successfully fetched",
      data: ingredient,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get("/:ingredientId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "ingredient fetched successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async getIngredient(@Res() res, @Param("ingredientId", new ValidateObjectId()) ingredientId) {
    const ingredient = await this.ingredientService.getIngredient(ingredientId);
    return res.status(HttpStatus.OK).json({
      message: "Ingredient has been fetched successfully",
      data: ingredient,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created ingredient successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createIngredient(@Res() res, @Body() ingredientDTO: IngredientDTO) {
    const ingredient = await this.ingredientService.createIngredient(ingredientDTO);
    return res.status(HttpStatus.OK).json({
      message: "Ingredient has been created successfully",
      data: ingredient,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put("/:ingredientId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "ingredient updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updateIngredient(@Res() res, @Body() ingredientdto: Partial<IngredientDTO>, @Param("ingredientId", new ValidateObjectId()) ingredientId) {
    const ingredient = await this.ingredientService.updateIngredient(ingredientId, ingredientdto);
    return res.status(HttpStatus.OK).json({
      message: "Ingredient has been updated successfully",
      data: ingredient,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete("/:ingredientId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "ingredient updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async archiveIngredient(@Res() res, @Param("ingredientId", new ValidateObjectId()) ingredientId) {
    const ingredient = await this.ingredientService.deleteIngredient(ingredientId);
    return res.status(HttpStatus.OK).json({
      message: "Ingredient has been purged successfully",
      data: ingredient,
    });
  }
}

// Ajouter middleware pour les requêtes api
