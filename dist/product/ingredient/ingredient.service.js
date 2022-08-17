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
exports.IngredientService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let IngredientService = class IngredientService {
    constructor(ingredientModel) {
        this.ingredientModel = ingredientModel;
    }
    async getAllIngredient() {
        return await this.ingredientModel.find({}).exec();
    }
    async getIngredient(ingredientId) {
        return await this.ingredientModel.findById(ingredientId);
    }
    async updateIngredient(ingredientId, ingredient) {
        return await this.ingredientModel.findByIdAndUpdate(ingredientId, ingredient, { new: true });
    }
    async deleteIngredient(ingredientId) {
        return await this.ingredientModel.findByIdAndUpdate(ingredientId, { active: false });
    }
    async createIngredient(ingredient) {
        const existingIngredient = await this.ingredientModel.find({ name: ingredient.name }).exec();
        if (existingIngredient && existingIngredient.length > 0) {
            return existingIngredient[0];
        }
        const newIngredient = new this.ingredientModel(ingredient);
        return await newIngredient.save();
    }
};
IngredientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Ingredient")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IngredientService);
exports.IngredientService = IngredientService;
//# sourceMappingURL=ingredient.service.js.map