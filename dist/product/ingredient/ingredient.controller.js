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
exports.IngredientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ingredient_dto_1 = require("./dto/ingredient.dto");
const ingredient_service_1 = require("./ingredient.service");
const id_pipe_1 = require("../pipe/id.pipe");
const roles_guard_1 = require("../../auth/guards/roles.guard");
let IngredientController = class IngredientController {
    constructor(ingredientService) {
        this.ingredientService = ingredientService;
    }
    async getCompanies(res, req) {
        const ingredient = await this.ingredientService.getAllIngredient();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Ingredient has been successfully fetched",
            data: ingredient,
        });
    }
    async getIngredient(res, ingredientId) {
        const ingredient = await this.ingredientService.getIngredient(ingredientId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Ingredient has been fetched successfully",
            data: ingredient,
        });
    }
    async createIngredient(res, ingredientDTO) {
        const ingredient = await this.ingredientService.createIngredient(ingredientDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Ingredient has been created successfully",
            data: ingredient,
        });
    }
    async updateIngredient(res, ingredientdto, ingredientId) {
        const ingredient = await this.ingredientService.updateIngredient(ingredientId, ingredientdto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Ingredient has been updated successfully",
            data: ingredient,
        });
    }
    async archiveIngredient(res, ingredientId) {
        const ingredient = await this.ingredientService.deleteIngredient(ingredientId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Ingredient has been purged successfully",
            data: ingredient,
        });
    }
};
__decorate([
    (0, common_1.Get)("/list"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Ingredient has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch ingredient details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Get)("/:ingredientId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "ingredient fetched successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("ingredientId", new id_pipe_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getIngredient", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created ingredient successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ingredient_dto_1.IngredientDTO]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "createIngredient", null);
__decorate([
    (0, common_1.Put)("/:ingredientId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "ingredient updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("ingredientId", new id_pipe_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "updateIngredient", null);
__decorate([
    (0, common_1.Delete)("/:ingredientId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "ingredient updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("ingredientId", new id_pipe_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "archiveIngredient", null);
IngredientController = __decorate([
    (0, swagger_1.ApiTags)("api/ingredient"),
    (0, common_1.Controller)("api/ingredient"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [ingredient_service_1.IngredientService])
], IngredientController);
exports.IngredientController = IngredientController;
//# sourceMappingURL=ingredient.controller.js.map