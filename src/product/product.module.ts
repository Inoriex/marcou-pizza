import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { ProductController } from "./product.controller";
import { ProductSchema } from "./schemas/product.schema";
import { ProductService } from "./product.service";
import { IngredientModule } from "@product/ingredient/ingredient.module";
import { CategoryModule } from "@category/category.module";

@Module({
  imports: [LoggerModule, IngredientModule, MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }])],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
