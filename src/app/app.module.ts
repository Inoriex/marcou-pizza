import { AppConfigurationModule } from "@appconfig/app-configuration.module";
import { AppConfigurationService } from "@appconfig/app-configuration.service";
import { AppController } from "./controller/app.controller";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { UserModule } from "@user/user.module";
import { AuthModule } from "@auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./service/app.service";
import { CategoryModule } from "@pizza/category/category.module";
import { PizzaModule } from "@pizza/pizza.module";

@Module({
  imports: [
    AppConfigurationModule,
    LoggerModule,
    UserModule,
    AuthModule,
    PizzaModule,
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
