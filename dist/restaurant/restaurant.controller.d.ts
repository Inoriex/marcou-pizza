import { RestaurantService } from "@restaurant/restaurant.service";
import { RestaurantDTO } from "@restaurant/dto/restaurant.dto";
import { User } from "@user/interfaces/user.interface";
import { UserService } from "@user/user.service";
export declare class RestaurantController {
    private restaurantService;
    private readonly userService;
    constructor(restaurantService: RestaurantService, userService: UserService);
    getRestaurantsAddress(res: any, req: any, user: any): Promise<any>;
    getRestaurantAddress(res: any, req: any, restaurantId: any): Promise<any>;
    createAddress(user: User, res: any, restaurantDTO: RestaurantDTO): Promise<any>;
    updateRestaurant(res: any, restaurantDTO: Partial<RestaurantDTO>, user: any, restaurantId: any): Promise<any>;
    deleteRestaurant(res: any, restaurantDTO: Partial<RestaurantDTO>, restaurantId: any): Promise<any>;
}
