import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { CategoryController } from "./controller/category.controller";
import { CategorySchema } from "./schema/category.schema";
import { CategoryService } from "./service/category.service";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "category", schema: CategorySchema }])],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
