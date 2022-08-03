import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Restaurant } from "@restaurant/schema/restaurant.schema";
import { Address } from "@user/schema/address.schema";
import { CreateAddressDto } from "@user/dto/create-address.dto";
import { RestaurantDTO, CreateRestaurantDTO } from "@restaurant/dto/restaurant.dto";

@Injectable()
export class RestaurantService {
  constructor(@InjectModel("Restaurant") private readonly restaurantModel: Model<Restaurant>) {}

  async getAllRestaurant(): Promise<Restaurant[]> {
    return await this.restaurantModel.find({}).populate("address").exec();
  }

  async getRestaurant(restaurantId: string): Promise<Restaurant> {
    return await this.restaurantModel.findById(restaurantId).populate("address");
  }
  async createRestaurant(restaurant: CreateRestaurantDTO): Promise<Restaurant> {
    const existingRestaurant = await this.restaurantModel.find({ title: restaurant.title }).exec();
    if (existingRestaurant && existingRestaurant.length > 0) {
      return existingRestaurant[0];
    }
    const newAddress = await new this.restaurantModel(restaurant).populate("address");
    newAddress.populate("user");
    return newAddress.save();
  }

  async updateRestaurant(restaurantId: string, restaurantDto: Partial<RestaurantDTO>): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(restaurantId, restaurantDto, { new: true }).populate("address");
  }

  async deleteRestaurant(restaurantId: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(restaurantId, { active: false }).populate("address");
  }
}
