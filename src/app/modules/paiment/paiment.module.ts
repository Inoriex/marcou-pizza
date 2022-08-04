import { PaimentSchema } from "./schema/paiment.schema";
import { PaimentService } from "./service/paiment.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "./../../../logger/logger.module";
import { PaimentController } from "./controller/paiment.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "Ticket", schema: PaimentSchema }])],
  controllers: [PaimentController],
  providers: [PaimentService],
  exports: [PaimentService],
})
export class PaimentModule {}
