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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async getAllProduct() {
        return await this.productModel.find({}).populate("ingredients").exec();
    }
    async getAllPizzas() {
        return await this.productModel.find({ category: "Pizza" }).populate("ingredients").exec();
    }
    async getAllDrinks() {
        return await this.productModel.find({ category: "Boisson" }).exec();
    }
    async getAllSupplements() {
        return await this.productModel.find({ category: "Supplément" }).populate("ingredients").exec();
    }
    async getProduct(productId) {
        const product = await this.productModel.findById(productId);
        if (product.category === "Pizza") {
            return await this.productModel.findById(productId).populate("ingredients");
        }
        return product;
    }
    async createPizza(pizza) {
        const existingPizza = await this.productModel.find({ name: pizza.name, category: pizza.category }).exec();
        if (existingPizza && existingPizza.length > 0) {
            return existingPizza[0];
        }
        const newPizza = await new this.productModel(pizza).populate("ingredients");
        await newPizza;
        return newPizza.save();
    }
    async createDrink(drink) {
        const existingDrink = await this.productModel.find({ name: drink.name, category: drink.category }).exec();
        if (existingDrink && existingDrink.length > 0) {
            return existingDrink[0];
        }
        const newDrink = await new this.productModel(drink);
        await newDrink;
        return newDrink.save();
    }
    async createSupplement(supplement) {
        const existingSupp = await this.productModel.find({ name: supplement.name, category: supplement.category }).exec();
        if (existingSupp && existingSupp.length > 0) {
            return existingSupp[0];
        }
        const newSupp = await new this.productModel(supplement);
        await newSupp;
        return newSupp.save();
    }
    async updatePizza(productId, product) {
        return await this.productModel.findByIdAndUpdate(productId, product, { new: true }).populate("ingredients");
    }
    async updateDrink(productId, product) {
        return await this.productModel.findByIdAndUpdate(productId, product, { new: true });
    }
    async updateSupp(productId, product) {
        return await this.productModel.findByIdAndUpdate(productId, product, { new: true });
    }
    async deleteProduct(productId) {
        return await this.productModel.findByIdAndUpdate(productId, { active: false });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Product")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map