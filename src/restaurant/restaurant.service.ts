import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Restaurant } from "@restaurant/schema/restaurant.schema";
import { RestaurantDTO, CreateRestaurantDTO } from "@restaurant/dto/restaurant.dto";
import { UserService } from "@user/user.service";

@Injectable()
export class RestaurantService {
  constructor(@InjectModel("Restaurant") private readonly restaurantModel: Model<Restaurant>, private readonly userService: UserService) {}

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
    return newAddress.save();
  }
  async updateRestaurant(restaurantId: string, restaurantDto: Partial<RestaurantDTO>, userId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(restaurantId).exec();
    console.log(restaurantDto, userId);
    await this.userService.updateAddress(restaurant.address._id, restaurantDto.address, userId);
    return await this.restaurantModel.findByIdAndUpdate(restaurantId, restaurantDto, { new: true }).populate("address");
  }

  async deleteRestaurant(restaurantId: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(restaurantId, { active: false }).populate("address");
  }
}
