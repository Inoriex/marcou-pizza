import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, Req, Res, Query, Redirect } from "@nestjs/common";
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
import { Response } from "express";
@ApiTags("api/user")
@Controller("api/user")
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Req() request) {
    try {
      const userId = request.user.id;
      return this.userService.find(userId);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get("/address")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "Impossible de récupérer l'adresse de l'utilisateur" })
  getUserAddresses(@GetUser() user: User) {
    try {
      const userId = user.id;
      console.log(userId);
      return this.userService.getUserAddresses(userId);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post("address/create")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "Impossible de créer l'adresse de l'utilisateur" })
  CreateUserAddress(@Req() req, @GetUser() user: User, @Body() address: CreateAddressDto) {
    try {
      const userId = user.id;
      return this.userService.addAddress(address, userId);
    } catch (error) {
      console.log(error);
      throw new Error("unable to create user address");
    }
  }
  @UseGuards(JwtAuthGuard)
  @Put("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "Impossible de modifier l'adresse de l'utilisateur" })
  UpdateUserAddress(@GetUser() user: User, @Body() address: Partial<CreateAddressDto>, @Param("addressId") addressId: string) {
    try {
      const userId = user.id;
      return this.userService.updateAddress(addressId, address, userId);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "Impossible de supprimer l'adresse de l'utilisateur" })
  DeleteUserAddress(@GetUser() user: User, @Param("addressId") addressId: string) {
    try {
      const userId = user.id;
      return this.userService.deleteAddress(addressId, userId);
    } catch (error) {
      throw error;
    }
  }

  // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
  // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: "Register user" })
  @ApiCreatedResponse({})
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const address = await this.userService.createAddress(createUserDto.address);
      const { address: _, ...createUser } = createUserDto;
      return await this.userService.create({ ...createUser, addresses: [address._id] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get("verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Verify Email" })
  @ApiOkResponse({})
  @Redirect()
  async verifyEmail(@Req() req, @Res() res: Response, @Query() query: { verification: string }) {
    try {
      await this.userService.verifyEmail(req, query.verification);
      return { url: process.env.CLIENT_APP_URL + "login" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get("resend-verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "resend Verify Email" })
  @ApiOkResponse({})
  @Redirect()
  async ResendVerifyEmail(@Req() req, @Res() res: Response, @Body() email: string) {
    try {
      const userVerification = await this.userService.resendEmail(email);
      await this.userService.verifyEmail(req, userVerification);
      return { url: process.env.CLIENT_APP_URL + "login" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Login User" })
  @ApiOkResponse({})
  async login(@Req() req, @Body() loginUserDto: LoginUserDto) {
    try {
      return await this.userService.login(req, loginUserDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post("refresh-access-token")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: "Refresh Access Token with refresh token" })
  @ApiCreatedResponse({})
  async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
    try {
      return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get("user-info")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: "Get user info from refresh token" })
  @ApiCreatedResponse({})
  async userInfo(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
    try {
      console.log(this.refreshAccessToken);
      return await this.userService.getUser(refreshAccessTokenDto);
    } catch (error) {
      throw error.message;
    }
  }
  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Forgot password" })
  @ApiOkResponse({})
  async forgotPassword(@Req() req, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
    try {
      return await this.userService.forgotPassword(req, createForgotPasswordDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post("forgot-password-verify")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Verfiy forget password code" })
  @ApiOkResponse({})
  async forgotPasswordVerify(@Req() req, @Body() verifyUuidDto: VerifyUuidDto) {
    try {
      return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    try {
      return await this.userService.resetPassword(resetPasswordDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
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
