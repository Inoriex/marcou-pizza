import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "@auth/auth.service";
import { JwtStrategy } from "@auth/strategies/jwt.strategy";
import { configModule } from "@config/app/configure.root";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@user/user.module";
import { RefreshTokenSchema } from "./schemas/refresh-token.schema";
import { MailModule } from "@mail/mail.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "@user/schemas/user.schema";

@Module({
  imports: [
    configModule,
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "RefreshToken", schema: RefreshTokenSchema },
    ]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
