"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configModule = void 0;
const config_1 = require("@nestjs/config");
exports.configModule = config_1.ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
    isGlobal: true,
});
//# sourceMappingURL=configure.root.js.map