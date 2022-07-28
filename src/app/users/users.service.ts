import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel("user") private readonly userModel: Model<User>) {}
  async createUser(user_email: string, password: string) {
    const email = user_email.toLowerCase();
    Logger.log(user_email);
    const newUser = new this.userModel({
      email,
      password,
    });
    await newUser.save();
    return newUser;
  }
  findByEmail(email: string): Promise<User | undefined> {
    const user = this.userModel.findOne({ email });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
  findOne(id: number): Promise<User | undefined> {
    const user = this.userModel.findOne({ _id: id });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
