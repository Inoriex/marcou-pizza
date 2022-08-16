import { IsString, IsNotEmpty, IsEnum, Matches } from "class-validator";
import { categoryEnum } from "@category/enums/category.enum";
import { productEnum } from "@category/enums/product-type.enum";

export class PizzaDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  image?: string;

  @IsString()
  price_P: string;

  @IsString()
  price_G: string;

  @IsString()
  description?: string;

  @IsString()
  dispo?: string;

  @IsString()
  @Matches(categoryEnum.pizza)
  category: string;

  @IsString()
  @IsEnum(productEnum)
  productType: string;

  ingredients: string[];
}
