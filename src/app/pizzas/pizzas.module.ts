import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "src/logger/logger.module";
import { PizzasController } from "./controller/pizzas.controller";
import { PizzaSchema } from "./model/pizza.model";
import { PizzasService } from "./service/pizzas.service";

@Module({
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService],
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "pizza", schema: PizzaSchema }])],
})
export class PizzasModule {}
