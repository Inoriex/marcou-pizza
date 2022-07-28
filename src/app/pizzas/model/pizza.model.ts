import mongoose from "mongoose";

export const PizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    category: { type: String, required: true },
    price_P: { type: Number, required: true },
    price_G: { type: Number, required: true },
    description: { type: String, required: false },
    ingredient: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Pizza extends mongoose.Document {
  name: string;
  image: string;
  category: string;
  price_P: number;
  price_G: number;
  description: string;
  ingredient: string;
}
