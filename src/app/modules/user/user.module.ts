import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "@user/controller/user.controller";
import { UserSchema } from "@user/schema/user.schema";
import { UserService } from "@user/service/user.service";
import { AddressSchema } from "@user/schema/address.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Address", schema: AddressSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
