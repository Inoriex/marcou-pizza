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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("../mail/mail.service");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const request_ip_1 = require("request-ip");
const Cryptr = require("cryptr");
let AuthService = class AuthService {
    constructor(refreshTokenModel, userModel, jwtService, configService, mailService) {
        this.refreshTokenModel = refreshTokenModel;
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
        this.clientAppUrl = this.configService.get("FE_APP_URL");
        this.cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
    }
    async createAccessToken(userId) {
        const accessToken = (0, jsonwebtoken_1.sign)({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        return this.encryptText(accessToken);
    }
    async createRefreshToken(req, userId) {
        const refreshToken = new this.refreshTokenModel({
            userId,
            refreshToken: (0, uuid_1.v4)(),
            ip: this.getIp(req),
            browser: this.getBrowserInfo(req),
            country: this.getCountry(req),
        });
        await refreshToken.save();
        return refreshToken.refreshToken;
    }
    async findRefreshToken(token) {
        const refreshToken = await this.refreshTokenModel.findOne({ refreshToken: token });
        if (!refreshToken) {
            throw new common_1.UnauthorizedException("User has been logged out.");
        }
        return refreshToken.userId;
    }
    async validateUser(jwtPayload) {
        const user = await this.userModel.findOne({ _id: jwtPayload.userId, verified: true });
        if (!user) {
            throw new common_1.UnauthorizedException("User not found.");
        }
        return user;
    }
    jwtExtractor(request) {
        let token = null;
        if (request.header("x-token")) {
            token = request.get("x-token");
        }
        else if (request.headers.authorization) {
            token = request.headers.authorization.replace("Bearer ", "").replace(" ", "");
        }
        else if (request.body.token) {
            token = request.body.token.replace(" ", "");
        }
        if (request.query.token) {
            token = request.body.token.replace(" ", "");
        }
        const cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
        if (token) {
            try {
                token = cryptr.decrypt(token);
            }
            catch (err) {
                throw new common_1.BadRequestException("Bad request.");
            }
        }
        return token;
    }
    returnJwtExtractor() {
        return this.jwtExtractor;
    }
    getIp(req) {
        return (0, request_ip_1.getClientIp)(req);
    }
    getBrowserInfo(req) {
        return req.header["user-agent"] || "XX";
    }
    getCountry(req) {
        return req.header["cf-ipcountry"] ? req.header["cf-ipcountry"] : "XX";
    }
    encryptText(text) {
        return this.cryptr.encrypt(text);
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "createRefreshToken", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AuthService.prototype, "getIp", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AuthService.prototype, "getBrowserInfo", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AuthService.prototype, "getCountry", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("RefreshToken")),
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map