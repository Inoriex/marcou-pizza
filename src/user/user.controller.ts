import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiHeader, ApiOperation, ApiInternalServerErrorResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { UserService } from "@user/user.service";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { CreateAddressDto } from "@user/dto/create-address.dto";
import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@auth/decorators/roles.decorator";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CreateForgotPasswordDto } from "./dto/create-forgot-password.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user-address.dto";
import { VerifyUuidDto } from "./dto/verify-uuid.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { User } from "@user/interfaces/user.interface";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";

@ApiTags("api/user")
@Controller("api/user")
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Req() request) {
    const userId = request.user._id;
    return this.userService.find(userId);
  }
  @Get("/address")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch user address" })
  getUserAddresses(@GetUser() user: User) {
    const userId = user._id;
    return this.userService.getUserAddresses(userId);
  }

  @Post("/address")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user address" })
  CreateUserAddress(@GetUser() user: User, @Body() address: CreateAddressDto) {
    const userId = user._id;
    return this.userService.createAddress(address);
  }

  @Put("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user address" })
  UpdateUserAddress(@GetUser() user: User, @Body() address: Partial<CreateAddressDto>, @Param("addressId") addressId: string) {
    const userId = user._id;
    return this.userService.updateAddress(addressId, address, userId);
  }

  @Delete("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user address" })
  DeleteUserAddress(@GetUser() user: User, @Param("addressId") addressId: string) {
    const userId = user._id;
    return this.userService.deleteAddress(addressId, userId);
  }

  // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
  // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: "Register user" })
  @ApiCreatedResponse({})
  async register(@Body() createUserDto: CreateUserDto) {
    const address = await this.userService.createAddress(createUserDto.address);
    return await this.userService.create({ ...createUserDto, address: address._id });
  }

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Verify Email" })
  @ApiOkResponse({})
  async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
    return await this.userService.verifyEmail(req, verifyUuidDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Login User" })
  @ApiOkResponse({})
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return await this.userService.login(req, loginUserDto);
  }

  @Post("refresh-access-token")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: "Refresh Access Token with refresh token" })
  @ApiCreatedResponse({})
  async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
    return await this.userService.refreshAccessToken(refreshAccessTokenDto);
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Forgot password" })
  @ApiOkResponse({})
  async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
    return await this.userService.forgotPassword(req, createForgotPasswordDto);
  }

  @Post("forgot-password-verify")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Verfiy forget password code" })
  @ApiOkResponse({})
  async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
    return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Reset password after verify reset password" })
  @ApiBearerAuth()
  @ApiHeader({
    name: "Bearer",
    description: "the token we need for auth.",
  })
  @ApiOkResponse({})
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }

  @Get("data")
  @UseGuards(AuthGuard("jwt"))
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ description: "A private route for check the auth" })
  @ApiHeader({
    name: "Bearer",
    description: "the token we need for auth.",
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  findAll() {
    return this.userService.findAll();
  }
}
