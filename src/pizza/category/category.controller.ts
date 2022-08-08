import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { CategoryDTO } from "./dto/category.dto";
import { ValidateObjectId } from "@pizza/pipe/id.pipe";
import { CategoryService } from "./category.service";
import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@auth/decorators/roles.decorator";

//localhost:3000/api/category/
@ApiTags("api/category")
@Controller("api/category")
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

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
