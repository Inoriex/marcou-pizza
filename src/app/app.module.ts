import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AppConfigurationModule } from "@config/app-configuration.module";
import { AppConfigurationService } from "@config/app-configuration.service";
import { configModule } from "@/configure.root";
import { LoggerModule } from "@logger/logger.module";

import { UserModule } from "@user/user.module";
import { AuthModule } from "@auth/auth.module";
import { PizzaModule } from "@pizza/pizza.module";
import { TokenModule } from "@token/token.module";
import { MailModule } from "@mail/mail.module";
import { RestaurantModule } from "@restaurant/restaurant.module";

@Module({
  imports: [
    AppConfigurationModule,
    LoggerModule,
    UserModule,
    AuthModule,
    configModule,
    PizzaModule,
    RestaurantModule,
    TokenModule,
    MailModule,
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
