"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const logger_module_1 = require("../../logger/logger.module");
const ingredient_controller_1 = require("./ingredient.controller");
const ingredient_service_1 = require("./ingredient.service");
const ingredient_schema_1 = require("./schemas/ingredient.schema");
let IngredientModule = class IngredientModule {
};
IngredientModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, mongoose_1.MongooseModule.forFeature([{ name: "Ingredient", schema: ingredient_schema_1.IngredientSchema }])],
        providers: [ingredient_service_1.IngredientService],
        exports: [ingredient_service_1.IngredientService],
        controllers: [ingredient_controller_1.IngredientController],
    })
], IngredientModule);
exports.IngredientModule = IngredientModule;
//# sourceMappingURL=ingredient.module.js.map