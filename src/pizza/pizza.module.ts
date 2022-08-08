import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { PizzaController } from "./pizza.controller";
import { PizzaSchema } from "./schema/pizza.schema";
import { PizzaService } from "./pizza.service";
import { IngredientModule } from "@pizza/ingredient/ingredient.module";
import { CategoryModule } from "@pizza/category/category.module";

@Module({
  imports: [LoggerModule, IngredientModule, CategoryModule, MongooseModule.forFeature([{ name: "Pizza", schema: PizzaSchema }])],
  providers: [PizzaService],
  exports: [PizzaService],
  controllers: [PizzaController],
})
export class PizzaModule {}
