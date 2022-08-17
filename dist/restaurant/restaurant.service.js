"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
let RestaurantService = class RestaurantService {
    constructor(restaurantModel, userService) {
        this.restaurantModel = restaurantModel;
        this.userService = userService;
    }
    async getAllRestaurant() {
        return await this.restaurantModel.find({}).populate("address").exec();
    }
    async getRestaurant(restaurantId) {
        return await this.restaurantModel.findById(restaurantId).populate("address");
    }
    async createRestaurant(restaurant) {
        const existingRestaurant = await this.restaurantModel.find({ title: restaurant.title }).exec();
        if (existingRestaurant && existingRestaurant.length > 0) {
            return existingRestaurant[0];
        }
        const newAddress = await new this.restaurantModel(restaurant).populate("address");
        return newAddress.save();
    }
    async updateRestaurant(restaurantId, restaurantDto, userId) {
        const restaurant = await this.restaurantModel.findById(restaurantId).exec();
        console.log(restaurantDto, userId);
        await this.userService.updateAddress(restaurant.address._id, restaurantDto.address, userId);
        return await this.restaurantModel.findByIdAndUpdate(restaurantId, restaurantDto, { new: true }).populate("address");
    }
    async deleteRestaurant(restaurantId) {
        return await this.restaurantModel.findByIdAndDelete(restaurantId, { active: false }).populate("address");
    }
};
RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Restaurant")),
    __metadata("design:paramtypes", [mongoose_2.Model, user_service_1.UserService])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map