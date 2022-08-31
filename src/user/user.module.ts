import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "@user/user.controller";
import { UserSchema } from "@user/schemas/user.schema";
import { UserService } from "@user/user.service";
import { AddressSchema } from "@user/schemas/address.schema";
import { AuthModule } from "@auth/auth.module";
import { ForgotPasswordSchema } from "./schemas/forgot-password.schema";
import { MailModule } from "@/mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Address", schema: AddressSchema }]),
    MongooseModule.forFeature([{ name: "ForgotPassword", schema: ForgotPasswordSchema }]),
    AuthModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
