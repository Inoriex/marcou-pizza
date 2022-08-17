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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_dto_1 = require("./dto/category.dto");
const id_pipe_1 = require("../product/pipe/id.pipe");
const category_service_1 = require("./category.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getCompanies(res, req) {
        const category = await this.categoryService.getAllCategory();
        return res.status(common_1.HttpStatus.OK).json({
            message: "Category has been successfully fetched",
            data: category,
        });
    }
    async getCategory(res, categoryId) {
        const category = await this.categoryService.getCategory(categoryId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Category has been fetched successfully",
            data: category,
        });
    }
    async createCategory(res, categoryDTO) {
        const category = await this.categoryService.createCategory(categoryDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Category has been created successfully",
            data: category,
        });
    }
    async updateCategory(res, categoryDTO, categoryId) {
        const category = await this.categoryService.updateCategory(categoryId, categoryDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Category has been updated successfully",
            data: category,
        });
    }
    async archiveCategory(res, categoryId) {
        const category = await this.categoryService.deleteCategory(categoryId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Category has been purged successfully",
            data: category,
        });
    }
};
__decorate([
    (0, common_1.Get)("/list"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Category has been successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch category details" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Get)("/:categoryId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "category fetched successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("categoryId", new id_pipe_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created category successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)("/:categoryId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "category updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("categoryId", new id_pipe_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)("/:categoryId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "category updated successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("categoryId", new id_pipe_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "archiveCategory", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)("api/category"),
    (0, common_1.Controller)("api/category"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map