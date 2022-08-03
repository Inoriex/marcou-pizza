import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { CategoryDTO } from "../dto/category.dto";
import { ValidateObjectId } from "@pizza/pipe/id.pipe";
import { CategoryService } from "../service/category.service";

//localhost:3000/api/categories/
@Controller("api/category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/list")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Category has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch category details" })
  async getCompanies(@Res() res, @Req() req) {
    const category = await this.categoryService.getAllCategory();
    return res.status(HttpStatus.OK).json({
      message: "Category has been successfully fetched",
      data: category,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get("/:categoryId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "category fetched successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async getCategory(@Res() res, @Param("categoryId", new ValidateObjectId()) categoryId) {
    const category = await this.categoryService.getCategory(categoryId);
    return res.status(HttpStatus.OK).json({
      message: "Category has been fetched successfully",
      data: category,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created category successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createCategory(@Res() res, @Body() categoryDTO: CategoryDTO) {
    const category = await this.categoryService.createCategory(categoryDTO);
    return res.status(HttpStatus.OK).json({
      message: "Category has been created successfully",
      data: category,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put("/:categoryId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "category updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updateCategory(@Res() res, @Body() categoryDTO: Partial<CategoryDTO>, @Param("categoryId", new ValidateObjectId()) categoryId) {
    const category = await this.categoryService.updateCategory(categoryId, categoryDTO);
    return res.status(HttpStatus.OK).json({
      message: "Category has been updated successfully",
      data: category,
    });
  }

  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete("/:categoryId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "category updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async archiveCategory(@Res() res, @Param("categoryId", new ValidateObjectId()) categoryId) {
    const category = await this.categoryService.deleteCategory(categoryId);
    return res.status(HttpStatus.OK).json({
      message: "Category has been purged successfully",
      data: category,
    });
  }
}

// Ajouter middleware pour les requêtes api
