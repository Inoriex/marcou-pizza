import { CategoryDTO } from "../categories/dto/category.dto";
import { IngredientsDTO } from "./ingredients.dto";

export interface PizzaDTO {
  name: string;
  image?: string;
  category: CategoryDTO;
  price_P: number;
  price_G: number;
  description?: string;
  ingredients: IngredientsDTO[];
}
// price_P pizza petite
// price_G pizza grande
