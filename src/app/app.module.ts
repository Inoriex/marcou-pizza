import { AppConfigurationModule } from "../config/app-configuration.module";
import { AppConfigurationService } from "../config/app-configuration.service";
import { AppController } from "./app.controller";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { LoggerModule } from "../logger/logger.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { CategoryModule } from "./pizzas/categories/category.module";
import { PizzasModule } from "./pizzas/pizzas.module";

@Module({
  imports: [
    AppConfigurationModule,
    LoggerModule,
    UsersModule,
    AuthModule,
    PizzasModule,
    CategoryModule,
    ConfigModule.forRoot(),
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
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
