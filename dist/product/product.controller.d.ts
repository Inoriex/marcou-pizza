import { PizzaDTO } from "@product/dto/pizza.dto";
import { ProductService } from "@product/product.service";
import { DrinkDTO } from "./dto/drink.dto";
import { SuppDTO } from "./dto/supplement.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAll(res: any, req: any): Promise<any>;
    getPizzas(res: any, req: any): Promise<any>;
    getDrinks(res: any, req: any): Promise<any>;
    getSupplements(res: any, req: any): Promise<any>;
    getProduct(res: any, productId: any): Promise<any>;
    createPizza(res: any, pizzaDTO: PizzaDTO): Promise<any>;
    createDrink(res: any, drinkDTO: DrinkDTO): Promise<any>;
    createSupplement(res: any, supplementDTO: SuppDTO): Promise<any>;
    updatePizza(res: any, pizzaDTO: Partial<PizzaDTO>, productId: any): Promise<any>;
    updateDrink(res: any, drinkDTO: Partial<DrinkDTO>, productId: any): Promise<any>;
    updateSupp(res: any, SuppDTO: Partial<SuppDTO>, productId: any): Promise<any>;
    archiveProduct(res: any, productId: any): Promise<any>;
}
