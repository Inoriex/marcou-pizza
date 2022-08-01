import { CategoryDTO } from "../category/dto/category.dto";
import { IngredientDTO } from "../ingredient/dto/ingredient.dto";

export interface PizzaDTO {
  name: string;
  image?: string;
  category: CategoryDTO;
  price_P: number;
  price_G: number;
  description?: string;
  ingredients: IngredientDTO[];
}
// price_P pizza petite
// price_G pizza grande
