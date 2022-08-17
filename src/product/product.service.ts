import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PizzaDTO } from "./dto/pizza.dto";
import { Product } from "./schemas/product.schema";
import { SuppDTO } from "./dto/supplement.dto";
import { DrinkDTO } from "./dto/drink.dto";

/* Category
pizza = "Pizza",
supplement = "Supplément",
drink = "Boisson", */

/* ProductType
tomato = "Base tomate",
cream = "Base crème", */

@Injectable()
export class ProductService {
  constructor(@InjectModel("Product") private readonly productModel: Model<Product>) {}

  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find({}).populate("ingredients").exec();
  }
  async getAllPizzas(): Promise<Product[]> {
    return await this.productModel.find({ category: "Pizza" }).populate("ingredients").exec();
  }
  async getAllDrinks(): Promise<Product[]> {
    return await this.productModel.find({ category: "Boisson" }).exec();
  }
  async getAllSupplements(): Promise<Product[]> {
    return await this.productModel.find({ category: "Supplément" }).populate("ingredients").exec();
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (product.category === "Pizza") {
      return await this.productModel.findById(productId).populate("ingredients");
    }
    return product;
  }

  async createPizza(pizza: PizzaDTO): Promise<Product> {
    const existingPizza = await this.productModel.find({ name: pizza.name, category: pizza.category }).exec();
    if (existingPizza && existingPizza.length > 0) {
      return existingPizza[0];
    }
    const newPizza = await new this.productModel(pizza).populate("ingredients");

    await newPizza;
    return newPizza.save();
  }
  async createDrink(drink: DrinkDTO): Promise<Product> {
    const existingDrink = await this.productModel.find({ name: drink.name, category: drink.category }).exec();
    if (existingDrink && existingDrink.length > 0) {
      return existingDrink[0];
    }
    const newDrink = await new this.productModel(drink);

    await newDrink;
    return newDrink.save();
  }
  async createSupplement(supplement: SuppDTO): Promise<Product> {
    const existingSupp = await this.productModel.find({ name: supplement.name, category: supplement.category }).exec();
    if (existingSupp && existingSupp.length > 0) {
      return existingSupp[0];
    }
    const newSupp = await new this.productModel(supplement);

    await newSupp;
    return newSupp.save();
  }

  async updatePizza(productId: string, product: Partial<PizzaDTO>): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(productId, product, { new: true }).populate("ingredients");
  }
  async updateDrink(productId: string, product: Partial<DrinkDTO>): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(productId, product, { new: true });
  }
  async updateSupp(productId: string, product: Partial<SuppDTO>): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(productId, product, { new: true });
  }
  async deleteProduct(productId: string): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(productId, { active: false });
  }
}
