import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "src/logger/logger.module";
import { CategoryController } from "./controller/category.controller";
import { CategorySchema } from "./model/category.model";
import { CategoryService } from "./services/category.service";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "category", schema: CategorySchema }])],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
