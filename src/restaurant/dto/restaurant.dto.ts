import { IsString, IsNotEmpty } from "class-validator";
import { CreateAddressDto } from "@user/dto/create-address.dto";

export class RestaurantDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  image?: string;

  @IsString()
  ceo: string;

  @IsString()
  tel: string;

  @IsString()
  horaires: string;

  @IsString()
  description?: string;

  address: CreateAddressDto;
}
export class CreateRestaurantDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  image?: string;

  @IsString()
  ceo: string;

  @IsString()
  tel: string;

  @IsString()
  description?: string;

  @IsString()
  horaires: string;

  address: string;
}
