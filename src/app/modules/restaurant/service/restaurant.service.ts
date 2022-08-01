import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address } from "@restaurant/schema/restaurant.schema";
import { AddressDTO } from "@restaurant/dto/address.dto";

@Injectable()
export class RestaurantService {
  constructor(@InjectModel("Address") private readonly AddressModel: Model<Address>) {}
  async getAllAddress(): Promise<Address[]> {
    return await this.AddressModel.find({}).exec();
  }

  async getAddress(AddressId: string): Promise<Address> {
    return await this.AddressModel.findById(AddressId);
  }

  async updateAddress(AddressId: string, addressDto: Partial<AddressDTO>): Promise<Address> {
    return await this.AddressModel.findByIdAndUpdate(AddressId, addressDto, { new: true });
  }

  async deleteAdress(AddressId: string): Promise<Address> {
    return await this.AddressModel.findByIdAndDelete(AddressId, { active: false });
  }
}
