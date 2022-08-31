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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("./user.service");
const get_user_decorator_1 = require("../components/decorators/get-user.decorator");
const create_address_dto_1 = require("./dto/create-address.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const create_forgot_password_dto_1 = require("./dto/create-forgot-password.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const create_user_address_dto_1 = require("./dto/create-user-address.dto");
const verify_uuid_dto_1 = require("./dto/verify-uuid.dto");
const refresh_access_token_dto_1 = require("./dto/refresh-access-token.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    me(request) {
        try {
            const userId = request.user.id;
            return this.userService.find(userId);
        }
        catch (error) {
            throw error;
        }
    }
    getUserAddresses(user) {
        try {
            const userId = user.id;
            console.log(userId);
            return this.userService.getUserAddresses(userId);
        }
        catch (error) {
            throw error;
        }
    }
    CreateUserAddress(req, user, address) {
        try {
            const userId = user.id;
            return this.userService.addAddress(address, userId);
        }
        catch (error) {
            console.log(error);
            throw new Error("unable to create user address");
        }
    }
    UpdateUserAddress(user, address, addressId) {
        try {
            const userId = user.id;
            return this.userService.updateAddress(addressId, address, userId);
        }
        catch (error) {
            throw error;
        }
    }
    DeleteUserAddress(user, addressId) {
        try {
            const userId = user.id;
            return this.userService.deleteAddress(addressId, userId);
        }
        catch (error) {
            throw error;
        }
    }
    async register(createUserDto) {
        try {
            const address = await this.userService.createAddress(createUserDto.address);
            const { address: _ } = createUserDto, createUser = __rest(createUserDto, ["address"]);
            return await this.userService.create(Object.assign(Object.assign({}, createUser), { addresses: [address._id] }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async verifyEmail(req, query) {
        try {
            return await this.userService.verifyEmail(req, query.verification);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async login(req, loginUserDto) {
        try {
            console.log(loginUserDto);
            return await this.userService.login(req, loginUserDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async refreshAccessToken(refreshAccessTokenDto) {
        try {
            return await this.userService.refreshAccessToken(refreshAccessTokenDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async forgotPassword(req, createForgotPasswordDto) {
        try {
            return await this.userService.forgotPassword(req, createForgotPasswordDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async forgotPasswordVerify(req, verifyUuidDto) {
        try {
            return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async resetPassword(resetPasswordDto) {
        try {
            return await this.userService.resetPassword(resetPasswordDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    findAll() {
        return this.userService.findAll();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("/me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("/address"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "user address successfully fetched" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to fetch user address" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserAddresses", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("address/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "user address successfully created" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to create user address" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_address_dto_1.CreateAddressDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "CreateUserAddress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)("/:addressId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "user address successfully created" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to create user address" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("addressId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "UpdateUserAddress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("/:addressId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "user address successfully created" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "PARAMETERS_FAILED_VALIDATION" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "unable to create user address" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("addressId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "DeleteUserAddress", null);
__decorate([
    (0, common_1.Post)("signup"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ description: "Register user" }),
    (0, swagger_1.ApiCreatedResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_address_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("verify-email"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: "Verify Email" }),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: "Login User" }),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("refresh-access-token"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ description: "Refresh Access Token with refresh token" }),
    (0, swagger_1.ApiCreatedResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_access_token_dto_1.RefreshAccessTokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshAccessToken", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: "Forgot password" }),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_forgot_password_dto_1.CreateForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("forgot-password-verify"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: "Verfiy forget password code" }),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_uuid_dto_1.VerifyUuidDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPasswordVerify", null);
__decorate([
    (0, common_1.Post)("reset-password"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: "Reset password after verify reset password" }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: "Bearer",
        description: "the token we need for auth.",
    }),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)("data"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, roles_decorator_1.Roles)("admin"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: "A private route for check the auth" }),
    (0, swagger_1.ApiHeader)({
        name: "Bearer",
        description: "the token we need for auth.",
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({}),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)("api/user"),
    (0, common_1.Controller)("api/user"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map