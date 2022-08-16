import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards, Logger } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { PizzaDTO } from "@product/dto/pizza.dto";
import { ProductService } from "@product/product.service";
import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@auth/decorators/roles.decorator";
import { DrinkDTO } from "./dto/drink.dto";
import { SuppDTO } from "./dto/supplement.dto";

// Localhost:3000/product/
@ApiTags("api/product")
@Controller("api/product")
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  // middleware qui verifie le webtoken, session toujours valide
  //localhost:3000/product/list
  @Get("/list")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Product has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch product details" })
  async getAll(@Res() res, @Req() req) {
    const product = await this.productService.getAllProduct();
    return res.status(HttpStatus.OK).json({
      message: "Product has been successfully fetched",
      data: product,
    });
  }
  @Get("/pizzas")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Pizzas has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch product details" })
  async getPizzas(@Res() res, @Req() req) {
    const pizzas = await this.productService.getAllPizzas();
    return res.status(HttpStatus.OK).json({
      message: "Product has been successfully fetched",
      data: pizzas,
    });
  }
  @Get("/drinks")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Drinks has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch product details" })
  async getDrinks(@Res() res, @Req() req) {
    const drinks = await this.productService.getAllDrinks();
    return res.status(HttpStatus.OK).json({
      message: "Product has been successfully fetched",
      data: drinks,
    });
  }
  @Get("/supplements")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "Supplements has been successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch product details" })
  async getSupplements(@Res() res, @Req() req) {
    const supplements = await this.productService.getAllSupplements();
    return res.status(HttpStatus.OK).json({
      message: "Product has been successfully fetched",
      data: supplements,
    });
  }

  @Get("/:productId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "product fetched successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async getProduct(@Res() res, @Param("productId") productId) {
    const product = await this.productService.getProduct(productId);
    return res.status(HttpStatus.OK).json({
      message: "Product has been fetched successfully",
      data: product,
    });
  }

  @Post("/create-pizza")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created product successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createPizza(@Res() res, @Body() pizzaDTO: PizzaDTO) {
    Logger.log(pizzaDTO);
    const pizza = await this.productService.createPizza(pizzaDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product has been created successfully",
      data: pizza,
    });
  }

  @Post("/create-drink")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created product successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createDrink(@Res() res, @Body() drinkDTO: DrinkDTO) {
    Logger.log(drinkDTO);
    const drink = await this.productService.createDrink(drinkDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product has been created successfully",
      data: drink,
    });
  }

  @Post("/create-supplement")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "created product successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async createSupplement(@Res() res, @Body() supplementDTO: SuppDTO) {
    Logger.log(supplementDTO);
    const supplement = await this.productService.createSupplement(supplementDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product has been created successfully",
      data: supplement,
    });
  }

  @Put("/pizza/:productId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "product updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updatePizza(@Res() res, @Body() pizzaDTO: Partial<PizzaDTO>, @Param("productId") productId) {
    const pizza = await this.productService.updatePizza(productId, pizzaDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product has been updated successfully",
      data: pizza,
    });
  }
  @Put("/drink/:productId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "product updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updateDrink(@Res() res, @Body() drinkDTO: Partial<DrinkDTO>, @Param("productId") productId) {
    const drink = await this.productService.updateDrink(productId, drinkDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product has been updated successfully",
      data: drink,
    });
  }
  @Put("/supplement/:productId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "product updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async updateSupp(@Res() res, @Body() SuppDTO: Partial<SuppDTO>, @Param("productId") productId) {
    const supp = await this.productService.updateSupp(productId, SuppDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product has been updated successfully",
      data: supp,
    });
  }

  @Delete("/:productId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "product updated successfully" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  async archiveProduct(@Res() res, @Param("productId") productId) {
    const product = await this.productService.deleteProduct(productId);
    return res.status(HttpStatus.OK).json({
      message: "Product has been purged successfully",
      data: product,
    });
  }
}
