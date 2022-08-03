import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { UserService } from "@user/service/user.service";
import * as bcrypt from "bcrypt";
import { IUser } from "@user/interfaces/user.interface";
import { GetUser } from "@/components/decorators/get-user.decorator";
import { IAddress } from "../interfaces/address.interface";
import { CreateAddressDto } from "@user/dto/create-address.dto";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/address")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully fetched" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to fetch user address" })
  getUserAddresses(@GetUser() user: IUser) {
    const userId = user._id;
    return this.userService.getUserAddresses(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/address")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user address" })
  CreateUserAddress(@GetUser() user: IUser, @Body() address: CreateAddressDto) {
    const userId = user._id;
    return this.userService.createAddress(address, userId);
  }
  @UseGuards(JwtAuthGuard)
  @Put("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user address" })
  UpdateUserAddress(@GetUser() user: IUser, @Body() address: Partial<CreateAddressDto>, @Param("addressId") addressId: string) {
    const userId = user._id;
    return this.userService.updateAddress(addressId, address, userId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete("/:addressId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "user address successfully created" })
  @ApiBadRequestResponse({ description: "PARAMETERS_FAILED_VALIDATION" })
  @ApiInternalServerErrorResponse({ description: "unable to create user address" })
  DeleteUserAddress(@GetUser() user: IUser, @Param("addressId") addressId: string) {
    const userId = user._id;
    return this.userService.deleteAddress(addressId, userId);
  }
}
