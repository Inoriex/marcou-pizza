import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsEnum, MinLength, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateAddressDto } from "./create-address.dto";
import { genderEnum } from "@user/enums/gender.enum";
import { IAddress } from "../interfaces/address.interface";

export class CreateUserDto {
  @ApiProperty({
    example: "john.doe@gmail.com",
    description: "The email of the User",
    format: "email",
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  readonly email: string;

  readonly avatar?: string;
  readonly avatarId?: string;

  @ApiProperty({
    example: "John",
    description: "The first name of the User",
    format: "string",
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  readonly firstName: string;

  @ApiProperty({
    example: "Doe",
    description: "The last name of the User",
    format: "string",
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(genderEnum)
  readonly gender: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly phone: string;

  readonly roles: string[];

  @ApiProperty({
    example: "Secret password",
    description: "The password of the User",
    format: "string",
    minLength: 5,
    maxLength: 1024,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{7,})/, { message: "Weak password" })
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
