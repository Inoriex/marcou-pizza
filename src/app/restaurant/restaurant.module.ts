import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "src/logger/logger.module";
import { RestaurantController } from "./controller/restaurant.controller";
import { RestaurantSchema } from "./schema/restaurant.schema";
import { RestaurantService } from "./service/restaurant.service";

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "restaurant", schema: RestaurantSchema }])],
})
export class RestaurantModule {}
