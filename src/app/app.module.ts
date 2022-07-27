import { AppConfigurationModule } from "../config/app-configuration.module";
import { AppConfigurationService } from "../config/app-configuration.service";
import { AppController } from "./app.controller";
import { UserController } from "./controllers/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { FirebaseAuthService } from "./services/firebase.service";
import { AppService } from "./app.service";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { PreauthMiddleware } from "../auth/preauth.middlewate";
import { LoggerModule } from "../logger/logger.module";
import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [
    AppConfigurationModule,
    LoggerModule,
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
  controllers: [AppController, AuthController, UserController],
  providers: [FirebaseAuthService, AppService],
  exports: [FirebaseAuthService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: "/api/v1", method: RequestMethod.ALL });
  }
}
