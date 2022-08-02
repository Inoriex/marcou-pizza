import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { RestaurantController } from "./controller/restaurant.controller";
import { RestaurantSchema } from "./schema/restaurant.schema";
import { RestaurantService } from "./service/restaurant.service";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "restaurant", schema: RestaurantSchema }])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
