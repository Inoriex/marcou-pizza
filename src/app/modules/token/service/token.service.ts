import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserToken } from "@token/interfaces/user-token.interface";
import { CreateUserTokenDto } from "@token/dto/create-user-token.dto";

@Injectable()
export class TokenService {
  constructor(@InjectModel("Token") private readonly tokenModel: Model<IUserToken>) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    const userToken = new this.tokenModel(createUserTokenDto);
    return await userToken.save();
  }

  async delete(uId: string, token: string): Promise<{ acknowledged?: boolean; deletedCount?: number }> {
    return await this.tokenModel.deleteOne({ uId, token });
  }

  async deleteAll(uId: string): Promise<{ acknowledged?: boolean; deletedCount?: number }> {
    return await this.tokenModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    const bool = await this.tokenModel.find({ $and: [{ uId: uId }, { token: token }] }).exec();
    return bool ? true : false;
  }
}
