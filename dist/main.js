"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const logger_1 = require("./logger/logger");
const swagger_2 = require("./swagger/swagger");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
const NEST_LOGGING = false;
async function bootstrap() {
    const opts = {};
    if (!NEST_LOGGING) {
        opts.logger = false;
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(logger_1.Logger));
    const configService = app.get(config_service_1.ConfigService);
    swagger_1.SwaggerModule.setup("api/v1", app, (0, swagger_2.createDocument)(app));
    app.enableCors();
    await app.listen(configService.get().port);
}
exports.default = admin;
bootstrap();
//# sourceMappingURL=main.js.map