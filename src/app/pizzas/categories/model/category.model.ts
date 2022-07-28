import * as mongoose from "mongoose";
import { CategoryDTO } from "../dto/category.dto";

export const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Category extends mongoose.Document {
  CategoryDTO;
}
