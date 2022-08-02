import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { PizzaController } from "./controller/pizza.controller";
import { PizzaSchema } from "./schema/pizza.schema";
import { PizzaService } from "./service/pizza.service";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "pizza", schema: PizzaSchema }])],
  providers: [PizzaService],
  exports: [PizzaService],
  controllers: [PizzaController],
})
export class PizzaModule {}
