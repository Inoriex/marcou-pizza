import { NestApplicationOptions } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@config/config.service";
import { Logger } from "@logger/logger";
import { createDocument } from "./swagger/swagger";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

const NEST_LOGGING = false;
async function bootstrap() {
  const opts: NestApplicationOptions = {};
  if (!NEST_LOGGING) {
    opts.logger = false;
  }
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  SwaggerModule.setup("api/v1", app, createDocument(app));
  app.enableCors();
  await app.listen(configService.get().port);
}
export default admin;
bootstrap();
