import * as mongoose from "mongoose";
export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
// ON rajoute toutes les infos de base, genre le nom/prenom/tel etc adresse

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
}
