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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const restaurant_service_1 = require("./restaurant.service");
const restaurant_dto_1 = require("./dto/restaurant.dto");
const get_user_decorator_1 = require("../components/decorators/get-user.decorator");
const user_service_1 = require("../user/user.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
let RestaurantController = class RestaurantController {
    constructor(restaurantService, userService) {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }
    async getRestaurantsAddress(res, req, user) {
        const address = await this.restaurantService.getAllRestaurant();
        return res.status(common_1.HttpStatus.OK).json({
            message: "l’adresse a été récupéré avec succès ",
            data: address,
        });
    }
    async getRestaurantAddress(res, req, restaurantId) {
        const address = await this.restaurantService.getRestaurant(restaurantId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "l’adresse a été récupéré avec succès ",
            data: address,
        });
    }
    async createAddress(user, res, restaurantDTO) {
        const address = await this.userService.createAddress(restaurantDTO.address);
        const restaurant = await this.restaurantService.createRestaurant(Object.assign(Object.assign({}, restaurantDTO), { address: address._id }));
        return res.status(common_1.HttpStatus.OK).json({
            message: "L’adresse a été récupéré avec succès ",
            data: restaurant,
        });
    }
    async updateRestaurant(res, restaurantDTO, user, restaurantId) {
        const restaurant = await this.restaurantService.updateRestaurant(restaurantId, restaurantDTO, user._id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Le restaurant a été récupéré avec succès ",
            data: restaurant,
        });
    }
    async deleteRestaurant(res, restaurantDTO, restaurantId) {
        await this.restaurantService.deleteRestaurant(restaurantId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Le restaurant a été supprimé avec succès ",
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Récupération de l'address OK 👌 " }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de récupérer les détails de l'adresse" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurantsAddress", null);
__decorate([
    (0, common_1.Get)("/:restaurantId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Récupération de l'address OK 👌 " }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de récupérer les détails de l'adresse" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)("restaurantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getRestaurantAddress", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "created address successfully" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, restaurant_dto_1.RestaurantDTO]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "createAddress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)("/:restaurantId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "L'adresse a été updated avec succès" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de récupérer les détails de l'address" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __param(3, (0, common_1.Param)("restaurantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "updateRestaurant", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("/:restaurantId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "L'adresse a été supprimé avec succès" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de récupérer les détails de l'address" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("restaurantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "deleteRestaurant", null);
RestaurantController = __decorate([
    (0, swagger_1.ApiTags)("api/restaurant"),
    (0, common_1.Controller)("api/restaurant"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService, user_service_1.UserService])
], RestaurantController);
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map