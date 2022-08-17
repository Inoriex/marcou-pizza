import { Model } from "mongoose";
import { PizzaDTO } from "./dto/pizza.dto";
import { Pizza } from "./schemas/pizza.schema";
export declare class PizzaService {
    private readonly pizzaModel;
    constructor(pizzaModel: Model<Pizza>);
    getAllPizza(): Promise<Pizza[]>;
    getPizza(pizzaId: string): Promise<Pizza>;
    updatePizza(pizzaId: string, pizza: Partial<PizzaDTO>): Promise<Pizza>;
    deletePizza(pizzaId: string): Promise<Pizza>;
    createPizza(pizza: PizzaDTO): Promise<Pizza>;
}
