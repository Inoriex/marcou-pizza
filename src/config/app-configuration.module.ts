import { AppConfigurationService } from "./app-configuration.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import * as dotenv from "dotenv";
import { ConfigService } from "./config.service";

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    dotenv.config();
    const config = new ConfigService();
    config.loadFromEnv();
    return config;
  },
};

@Module({
  exports: [AppConfigurationService, configFactory],
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigurationService, configFactory],
})
export class AppConfigurationModule {}
