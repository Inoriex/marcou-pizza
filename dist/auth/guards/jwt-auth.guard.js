"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
    handleRequest(err, user, info, context, status) {
        if (info instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new common_1.UnauthorizedException("Invalid JWT");
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map