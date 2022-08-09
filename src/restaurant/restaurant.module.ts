import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantSchema } from "./schemas/restaurant.schema";
import { RestaurantService } from "./restaurant.service";
import { UserModule } from "@user/user.module";
import { AddressSchema } from "@user/schemas/address.schema";

@Module({
  imports: [
    LoggerModule,
    UserModule,
    MongooseModule.forFeature([
      { name: "Restaurant", schema: RestaurantSchema },
      { name: "Address", schema: AddressSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
