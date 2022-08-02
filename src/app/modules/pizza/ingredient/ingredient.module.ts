import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { IngredientController } from "./controller/ingredient.controller";
import { IngredientService } from "./service/ingredient.service";
import { IngredientSchema } from "./schema/ingredient.schema";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "category", schema: IngredientSchema }])],
  providers: [IngredientService],
  exports: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientsModule {}
