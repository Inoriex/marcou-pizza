import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Restaurant } from "@restaurant/schema/restaurant.schema";
import { AddressDTO } from "@restaurant/dto/address.dto";

@Injectable()
export class RestaurantService {
  constructor(@InjectModel("Restaurant") private readonly restaurantModel: Model<Restaurant>) {}
  async getAllAddress(): Promise<Restaurant[]> {
    return await this.restaurantModel.find({}).exec();
  }

  async getAddress(addressId: string): Promise<Restaurant> {
    return await this.restaurantModel.findById(addressId);
  }

  async updateAddress(addressId: string, addressDto: Partial<AddressDTO>): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(addressId, addressDto, { new: true });
  }

  async deleteAddress(addressId: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(addressId, { active: false });
  }
}
