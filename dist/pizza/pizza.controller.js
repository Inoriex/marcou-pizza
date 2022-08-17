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
exports.PizzaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pizza_dto_1 = require("./dto/pizza.dto");
const pizza_service_1 = require("./pizza.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
let PizzaController = class PizzaController {
    constructor(pizzaService) {
        this.pizzaService = pizzaService;
    }
    async getCompanies(res, req) {
        const pizza = await this.pizzaService.getAllPizza();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Pizza has been successfully fetched",
            data: pizza,
        });
    }
    async getPizza(res, pizzaId) {
        const pizza = await this.pizzaService.getPizza(pizzaId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Pizza has been fetched successfully",
            data: pizza,
        });
    }
    async createPizza(res, pizzaDTO) {
        common_1.Logger.log(pizzaDTO);
        const pizza = await this.pizzaService.createPizza(pizzaDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Pizza has been created successfully",
            data: pizza,
        });
    }
    async updatePizza(res, pizzaDTO, pizzaId) {
        const pizza = await this.pizzaService.updatePizza(pizzaId, pizzaDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Pizza has been updated successfully",
            data: pizza,
        });
    }
    async archivePizza(res, pizzaId) {
        const pizza = await this.pizzaService.deletePizza(pizzaId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Pizza has been purged successfully",
            data: pizza,
        });
    }
};
__decorate([
    (0, common_1.Get)("/list"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Pizza has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch pizza details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Get)("/:pizzaId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "pizza fetched successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("pizzaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "getPizza", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created pizza successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pizza_dto_1.PizzaDTO]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "createPizza", null);
__decorate([
    (0, common_1.Put)("/:pizzaId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "pizza updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("pizzaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "updatePizza", null);
__decorate([
    (0, common_1.Delete)("/:pizzaId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "pizza updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("pizzaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "archivePizza", null);
PizzaController = __decorate([
    (0, swagger_1.ApiTags)("api/pizza"),
    (0, common_1.Controller)("api/pizza"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [pizza_service_1.PizzaService])
], PizzaController);
exports.PizzaController = PizzaController;
//# sourceMappingURL=pizza.controller.js.map