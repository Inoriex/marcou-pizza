import { Body, Controller, Delete, HttpException, ValidationPipe, HttpStatus, Ip, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "@auth/service/auth.service";
import RefreshTokenDto from "@auth/dto/refresh-token.dto";
import { LoginDto } from "@auth/dto/login.dto";
import GoogleTokenDto from "@auth/dto/google-token.dto";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { ConfirmAccountDto } from "@auth/dto/confirm-account.dto";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
import { ForgotPasswordDto } from "@auth/dto/forgot-password.dto";
import { GetUser } from "@components/decorators/get-user.decorator";
import { IUser } from "@user/interfaces/user.interface";
import { ChangePasswordDto } from "@auth/dto/change-password.dto";

// Controller d'authentification => jwt
// Localhost:3000/auth/
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signUp")
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }
  // localhost:3000/auth/login
  @Post("login")
  // Fonction login qui renvoie un token (création de  session)
  /* async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers["user-agent"],
    });
  } */
  async login(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.login(signInDto);
  }
  // localhost:3000/auth/google/login
  @Post("/google/login")
  // Google login provider
  async googleLogin(@Body() body: GoogleTokenDto, @Req() req, @Ip() ip: string): Promise<{ accessToken: string; refreshToken: string }> {
    const result = await this.authService.loginGoogleUser(body.token, {
      userAgent: req.headers["user-agent"],
      ipAddress: ip,
    });
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "Error while logging in with google",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  @Post("/forgotPassword")
  async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch("/changePassword")
  @UseGuards(AuthGuard())
  async changePassword(@GetUser() user: IUser, @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto): Promise<boolean> {
    return this.authService.changePassword(user._id, changePasswordDto);
  }
  // localhost:3000/auth/refresh
  @Post("refresh")
  // refresh token
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete("logout")
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
