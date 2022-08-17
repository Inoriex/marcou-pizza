"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("./config/app/config.module");
const config_service_1 = require("./config/app/config.service");
const configure_root_1 = require("./config/app/configure.root");
const logger_module_1 = require("./logger/logger.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const product_module_1 = require("./product/product.module");
const mail_module_1 = require("./mail/mail.module");
const restaurant_module_1 = require("./restaurant/restaurant.module");
const order_module_1 = require("./order/order.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigurationModule,
            logger_module_1.LoggerModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            configure_root_1.configModule,
            product_module_1.ProductModule,
            restaurant_module_1.RestaurantModule,
            mail_module_1.MailModule,
            order_module_1.OrderModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.AppConfigurationModule],
                inject: [config_service_1.AppConfigurationService],
                useFactory: (appConfigService) => {
                    const options = {
                        uri: appConfigService.connectionString,
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    };
                    return options;
                },
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map