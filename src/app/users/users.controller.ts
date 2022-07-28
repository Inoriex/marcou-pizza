import { Body, Controller, Get, Post, Req, UseGuards, Logger } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Req() request) {
    const userId = request.user.userId;
    return this.usersService.findOne(userId);
  }
  /*
  @Post("/login")
  async login(@Body("password") userPassword: string, @Body("email") email: string) {
    const user = await this.usersService.findByEmail(email);
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
  @Post("/signup")
  async addUser(@Body("password") userPassword: string, @Body("email") email: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.createUser(email, hashedPassword);
    return {
      msg: "User successfully registered",
      userId: result.id,
      email: result.email,
    };
  }
}
