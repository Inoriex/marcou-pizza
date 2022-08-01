import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "@user/controller/user.controller";
import { UserSchema } from "@user/schema/user.schema";
import { UserService } from "@user/service/user.service";
@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
