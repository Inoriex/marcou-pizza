"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const logger_module_1 = require("../logger/logger.module");
const pizza_controller_1 = require("./pizza.controller");
const pizza_schema_1 = require("./schemas/pizza.schema");
const pizza_service_1 = require("./pizza.service");
const ingredient_module_1 = require("./ingredient/ingredient.module");
const category_module_1 = require("./category/category.module");
let PizzaModule = class PizzaModule {
};
PizzaModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, ingredient_module_1.IngredientModule, category_module_1.CategoryModule, mongoose_1.MongooseModule.forFeature([{ name: "Pizza", schema: pizza_schema_1.PizzaSchema }])],
        providers: [pizza_service_1.PizzaService],
        exports: [pizza_service_1.PizzaService],
        controllers: [pizza_controller_1.PizzaController],
    })
], PizzaModule);
exports.PizzaModule = PizzaModule;
//# sourceMappingURL=pizza.module.js.map