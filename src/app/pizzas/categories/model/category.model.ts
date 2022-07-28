import * as mongoose from "mongoose";

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
  _id: string;
  name: string;
}
