import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AppConfigurationModule } from "@config/app/config.module";
import { AppConfigurationService } from "@config/app/config.service";
import { configModule } from "@config/app/configure.root";
import { LoggerModule } from "@logger/logger.module";

import { UserModule } from "@user/user.module";
import { AuthModule } from "@auth/auth.module";
import { PizzaModule } from "@pizza/pizza.module";
import { MailModule } from "@mail/mail.module";
import { RestaurantModule } from "@restaurant/restaurant.module";
import { OrderModule } from "@order/order.module";

@Module({
  imports: [
    AppConfigurationModule,
    LoggerModule,
    UserModule,
    AuthModule,
    configModule,
    PizzaModule,
    RestaurantModule,
    MailModule,
    OrderModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
  ],
})
export class AppModule {}
