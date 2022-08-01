import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address } from "../schema/restaurant.schema";
import { AddressDTO } from "../dto/adresse.dto";

@Injectable()
export class RestaurantService {
  constructor(@InjectModel("Address") private readonly AddressModel: Model<Address>) {}
  async getAllAddress(): Promise<Address[]> {
    return await this.AddressModel.find({}).exec();
  }

  async getAddress(AddressId: string): Promise<Address> {
    return await this.AddressModel.findById(AddressId);
  }

  async updateAddress(AddressId: string, addressdto: Partial<AddressDTO>): Promise<Address> {
    return await this.AddressModel.findByIdAndUpdate(AddressId, addressdto, { new: true });
  }

  async deleteAdress(AddressId: string): Promise<Address> {
    return await this.AddressModel.findByIdAndDelete(AddressId, { active: false });
  }
}
