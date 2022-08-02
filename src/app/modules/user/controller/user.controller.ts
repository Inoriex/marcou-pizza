import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { UserService } from "@user/service/user.service";
import * as bcrypt from "bcrypt";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @UseGuards(JwtAuthGuard)
  @Get("/me")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch user details" })
  me(@Req() request) {
    const userId = request.user.userId;
    return this.userService.findOne(userId);
  } */
  /*
  @Post("/login")
  async login(@Body("password") userPassword: string, @Body("email") email: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(userPassword, user.password);
      if (isValid) {
        return {
          userId: user.id,
          email: user.email,
        };
      }
    }
    return null;
  }
 */
  /* @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user successfully registered" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch user details" })
  @Post("/signup")
  async addUser(@Body("password") userPassword: string, @Body("email") email: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.userService.createUser(email, hashedPassword);
    return {
      userId: result.id,
      email: result.email,
    };
  } */
}
