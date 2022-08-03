import { CategoryDTO } from "../category/dto/category.dto";
import { IngredientDTO } from "../ingredient/dto/ingredient.dto";
import { IsString, IsNotEmpty } from "class-validator";

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

  category: string;
  ingredients: string[];
}
