import { PizzaDTO } from "@pizza/dto/pizza.dto";
import { PizzaService } from "@pizza/pizza.service";
export declare class PizzaController {
    private pizzaService;
    constructor(pizzaService: PizzaService);
    getCompanies(res: any, req: any): Promise<any>;
    getPizza(res: any, pizzaId: any): Promise<any>;
    createPizza(res: any, pizzaDTO: PizzaDTO): Promise<any>;
    updatePizza(res: any, pizzaDTO: Partial<PizzaDTO>, pizzaId: any): Promise<any>;
    archivePizza(res: any, pizzaId: any): Promise<any>;
}
