import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards, ValidationPipe, Query, Patch, Logger } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { AuthService } from "@auth/service/auth.service";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ConfirmAccountDto } from "@auth/dto/confirm-account.dto";
import { SignInDto } from "@auth/dto/signin.dto";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
import { ForgotPasswordDto } from "@auth/dto/forgot-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { IUser } from "@user/interfaces/user.interface";
import { ChangePasswordDto } from "@auth/dto/change-password.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "User has been successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user" })
  @Post("/signUp")
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @Get("/confirm")
  async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "User has been successfully logged in" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to log user" })
  @Post("/signIn")
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }

  @Post("/forgotPassword")
  async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch("/changePassword")
  @UseGuards(JwtAuthGuard)
  async changePassword(@GetUser() user: IUser, @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto): Promise<boolean> {
    return this.authService.changePassword(user._id, changePasswordDto);
  }
}
