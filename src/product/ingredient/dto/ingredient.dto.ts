import { IsOptional, IsString, IsEnum, Matches, IsArray } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { productEnum } from "@category/enums/product-type.enum";
import { ingredientEnum } from "../enums/ingredient.enum";

export class IngredientDTO {
  @IsString()
  @ApiPropertyOptional()
  name: string;

  @IsArray()
  @IsEnum(productEnum, { each: true })
  @ApiPropertyOptional({
    description: "List of enums",
    isArray: true,
    enum: productEnum,
  })
  productType: productEnum[];

  @IsArray()
  @IsEnum(ingredientEnum)
  @ApiPropertyOptional({
    description: "Category of ingredient",
    isArray: true,
    enum: ingredientEnum,
  })
  category: ingredientEnum[];
}
