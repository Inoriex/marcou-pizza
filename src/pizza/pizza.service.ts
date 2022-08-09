import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PizzaDTO } from "./dto/pizza.dto";
import { Pizza } from "./schemas/pizza.schema";

@Injectable()
export class PizzaService {
  constructor(@InjectModel("Pizza") private readonly pizzaModel: Model<Pizza>) {}

  async getAllPizza(): Promise<Pizza[]> {
    return await this.pizzaModel.find({}).populate("ingredients").populate("category").exec();
    // OR findOne(pizza => pizza.name === pizzaName);
  }
  /*  async getCurrentPizza(pizzaId: string): Promise<Pizza[]> {
      return await this.pizzaModel.find({ _id: pizzaId }).exec();
    } */
  async getPizza(pizzaId: string): Promise<Pizza> {
    return await this.pizzaModel.findById(pizzaId).populate("ingredients").populate("category");
  }
  /* async getPizza(pizzaName: string): Promise<Pizza[]> {
      console.log(pizzaName);
      return await this.pizzaModel.find({ _id: pizzaName }).exec();
    } */
  async updatePizza(pizzaId: string, pizza: Partial<PizzaDTO>): Promise<Pizza> {
    return await this.pizzaModel.findByIdAndUpdate(pizzaId, pizza, { new: true }).populate("ingredients").populate("category");
  }
  async deletePizza(pizzaId: string): Promise<Pizza> {
    return await this.pizzaModel.findByIdAndUpdate(pizzaId, { active: false });
  }

  async createPizza(pizza: PizzaDTO): Promise<Pizza> {
    const existingPizza = await this.pizzaModel.find({ name: pizza.name }).exec();
    if (existingPizza && existingPizza.length > 0) {
      return existingPizza[0];
    }
    const newPizza = await new this.pizzaModel(pizza).populate("ingredients");

    await newPizza.populate("category");
    return newPizza.save();
  }
}
