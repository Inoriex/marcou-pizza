import { CategoryDTO } from "../categories/dto/category.dto";
import { CommentDTO } from "./comment.dto";

export interface PizzaDTO {
  _id: number;
  name: string;
  image?: string;
  category: CategoryDTO;
  label?: string;
  price: string;
  description?: string;
  comments: CommentDTO[];
}
