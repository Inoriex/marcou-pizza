import { Injectable, Logger, ClassSerializerInterceptor, UseInterceptors, SerializeOptions } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "@user/schema/user.schema";
import { IUser } from "@user/interface/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
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
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ["_"],
    groups: ["admin"],
  })
  async updatePassword(id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id: id }, payload);
  }
  findByEmail(email: string): Promise<User | undefined> {
    const user = this.userModel.findOne({ email });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
  findOne(id: ObjectId): Promise<User | undefined> {
    const user = this.userModel.findOne({ _id: id });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
