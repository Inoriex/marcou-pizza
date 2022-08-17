"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pizza_dto_1 = require("./dto/pizza.dto");
const product_service_1 = require("./product.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
const drink_dto_1 = require("./dto/drink.dto");
const supplement_dto_1 = require("./dto/supplement.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAll(res, req) {
        const product = await this.productService.getAllProduct();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been successfully fetched",
            data: product,
        });
    }
    async getPizzas(res, req) {
        const pizzas = await this.productService.getAllPizzas();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been successfully fetched",
            data: pizzas,
        });
    }
    async getDrinks(res, req) {
        const drinks = await this.productService.getAllDrinks();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been successfully fetched",
            data: drinks,
        });
    }
    async getSupplements(res, req) {
        const supplements = await this.productService.getAllSupplements();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been successfully fetched",
            data: supplements,
        });
    }
    async getProduct(res, productId) {
        const product = await this.productService.getProduct(productId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been fetched successfully",
            data: product,
        });
    }
    async createPizza(res, pizzaDTO) {
        common_1.Logger.log(pizzaDTO);
        const pizza = await this.productService.createPizza(pizzaDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been created successfully",
            data: pizza,
        });
    }
    async createDrink(res, drinkDTO) {
        common_1.Logger.log(drinkDTO);
        const drink = await this.productService.createDrink(drinkDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been created successfully",
            data: drink,
        });
    }
    async createSupplement(res, supplementDTO) {
        common_1.Logger.log(supplementDTO);
        const supplement = await this.productService.createSupplement(supplementDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been created successfully",
            data: supplement,
        });
    }
    async updatePizza(res, pizzaDTO, productId) {
        const pizza = await this.productService.updatePizza(productId, pizzaDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been updated successfully",
            data: pizza,
        });
    }
    async updateDrink(res, drinkDTO, productId) {
        const drink = await this.productService.updateDrink(productId, drinkDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been updated successfully",
            data: drink,
        });
    }
    async updateSupp(res, SuppDTO, productId) {
        const supp = await this.productService.updateSupp(productId, SuppDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been updated successfully",
            data: supp,
        });
    }
    async archiveProduct(res, productId) {
        const product = await this.productService.deleteProduct(productId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Product has been purged successfully",
            data: product,
        });
    }
};
__decorate([
    (0, common_1.Get)("/list"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Product has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch product details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/pizzas"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Pizzas has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch product details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPizzas", null);
__decorate([
    (0, common_1.Get)("/drinks"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Drinks has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch product details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDrinks", null);
__decorate([
    (0, common_1.Get)("/supplements"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Supplements has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch product details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getSupplements", null);
__decorate([
    (0, common_1.Get)("/:productId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "product fetched successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)("/create-pizza"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created product successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pizza_dto_1.PizzaDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createPizza", null);
__decorate([
    (0, common_1.Post)("/create-drink"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created product successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, drink_dto_1.DrinkDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createDrink", null);
__decorate([
    (0, common_1.Post)("/create-supplement"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created product successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, supplement_dto_1.SuppDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createSupplement", null);
__decorate([
    (0, common_1.Put)("/pizza/:productId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "product updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updatePizza", null);
__decorate([
    (0, common_1.Put)("/drink/:productId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "product updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateDrink", null);
__decorate([
    (0, common_1.Put)("/supplement/:productId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "product updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateSupp", null);
__decorate([
    (0, common_1.Delete)("/:productId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "product updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "archiveProduct", null);
ProductController = __decorate([
    (0, swagger_1.ApiTags)("api/product"),
    (0, common_1.Controller)("api/product"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map