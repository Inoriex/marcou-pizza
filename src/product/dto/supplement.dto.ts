import { IsString, IsNotEmpty, IsEnum, IsBoolean, Matches } from "class-validator";
import { categoryEnum } from "@category/enums/category.enum";

export class SuppDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  price: string;

  @IsString()
  description?: string;

  @IsBoolean()
  dispo?: boolean;

  @IsString()
  @Matches(categoryEnum.supplement)
  category: string;
}
