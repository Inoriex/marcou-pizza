import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "@user/user.controller";
import { UserSchema } from "@user/schema/user.schema";
import { UserService } from "@user/user.service";
import { AddressSchema } from "@user/schema/address.schema";
import { AuthModule } from "@auth/auth.module";
import { ForgotPasswordSchema } from "./schema/forgot-password.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Address", schema: AddressSchema }]),
    MongooseModule.forFeature([{ name: "ForgotPassword", schema: ForgotPasswordSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
