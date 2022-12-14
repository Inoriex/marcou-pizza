import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { CategoryController } from "./category.controller";
import { CategorySchema } from "./schemas/category.schema";
import { CategoryService } from "./category.service";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }])],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
