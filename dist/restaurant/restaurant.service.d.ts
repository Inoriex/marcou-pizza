import { Model } from "mongoose";
import { Restaurant } from "@restaurant/schemas/restaurant.schema";
import { RestaurantDTO, CreateRestaurantDTO } from "@restaurant/dto/restaurant.dto";
import { UserService } from "@user/user.service";
export declare class RestaurantService {
    private readonly restaurantModel;
    private readonly userService;
    constructor(restaurantModel: Model<Restaurant>, userService: UserService);
    getAllRestaurant(): Promise<Restaurant[]>;
    getRestaurant(restaurantId: string): Promise<Restaurant>;
    createRestaurant(restaurant: CreateRestaurantDTO): Promise<Restaurant>;
    updateRestaurant(restaurantId: string, restaurantDto: Partial<RestaurantDTO>, userId: string): Promise<Restaurant>;
    deleteRestaurant(restaurantId: string): Promise<Restaurant>;
}
