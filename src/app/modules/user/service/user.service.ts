import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "@user/interfaces/user.interface";
import { User } from "@user/schema/user.schema";
import * as bcrypt from "bcrypt";
import * as _ from "lodash";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { statusEnum } from "@user/enums/status.enum";
import { Address } from "@user/schema/address.schema";
import { CreateAddressDto } from "@user/dto/create-address.dto";

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(@InjectModel("User") private readonly userModel: Model<IUser>, @InjectModel("Address") private readonly addressModel: Model<Address>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto, roles: string[]): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = await new this.userModel(_.assignIn(createUserDto, { password: hash, roles })).populate("address");
    createdUser.status = statusEnum.active;
    return await createdUser.save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).populate("address").exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).populate("address").exec();
  }
  async update(id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id: id }, payload).populate("address");
  }

  async createAddress(address: CreateAddressDto, userId: string): Promise<Address> {
    const existingAddress = await this.addressModel
      .find({
        name: address.name,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
      })
      .exec();
    if (existingAddress && existingAddress.length > 0) {
      return existingAddress[0];
    }
    const newAddress = await new this.addressModel({ ...address, user: userId }).populate("user");
    return newAddress.save();
  }
  async getAllAddress(): Promise<Address[]> {
    return await this.addressModel.find({}).populate("user").exec();
  }

  async getAddress(addressId: string): Promise<Address> {
    return await this.addressModel.findById(addressId).populate("user");
  }
  async getUserAddresses(userId: string): Promise<Address[]> {
    return await this.addressModel.find({ user: userId });
  }
  async updateAddress(addressId: string, payload: Partial<CreateAddressDto>, userId: string): Promise<Address> {
    return this.userModel.updateOne({ _id: addressId, user: userId }, payload).populate("user");
  }
  async deleteAddress(addressId: string, userId: string) {
    return this.userModel.updateOne({ _id: addressId, user: userId });
    return await this.userModel.findByIdAndDelete(addressId, { active: false });
  }
}
