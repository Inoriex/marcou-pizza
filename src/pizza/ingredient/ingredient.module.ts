import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { IngredientController } from "./ingredient.controller";
import { IngredientService } from "./ingredient.service";
import { IngredientSchema } from "./schema/ingredient.schema";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "Ingredient", schema: IngredientSchema }])],
  providers: [IngredientService],
  exports: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientModule {}
