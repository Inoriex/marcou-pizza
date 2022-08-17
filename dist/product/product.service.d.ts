import { Model } from "mongoose";
import { PizzaDTO } from "./dto/pizza.dto";
import { Product } from "./schemas/product.schema";
import { SuppDTO } from "./dto/supplement.dto";
import { DrinkDTO } from "./dto/drink.dto";
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    getAllProduct(): Promise<Product[]>;
    getAllPizzas(): Promise<Product[]>;
    getAllDrinks(): Promise<Product[]>;
    getAllSupplements(): Promise<Product[]>;
    getProduct(productId: string): Promise<Product>;
    createPizza(pizza: PizzaDTO): Promise<Product>;
    createDrink(drink: DrinkDTO): Promise<Product>;
    createSupplement(supplement: SuppDTO): Promise<Product>;
    updatePizza(productId: string, product: Partial<PizzaDTO>): Promise<Product>;
    updateDrink(productId: string, product: Partial<DrinkDTO>): Promise<Product>;
    updateSupp(productId: string, product: Partial<SuppDTO>): Promise<Product>;
    deleteProduct(productId: string): Promise<Product>;
}
