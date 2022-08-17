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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaSchema = exports.Pizza = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const category_schema_1 = require("../category/schemas/category.schema");
const ingredient_schema_1 = require("../ingredient/schemas/ingredient.schema");
let Pizza = class Pizza extends mongoose_2.Document {
};
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", String)
], Pizza.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pizza.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pizza.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pizza.prototype, "price_P", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pizza.prototype, "price_G", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pizza.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Pizza.prototype, "dispo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: "Category" }),
    (0, class_transformer_1.Type)(() => category_schema_1.Category),
    __metadata("design:type", category_schema_1.Category)
], Pizza.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "Ingredient" }],
    }),
    (0, class_transformer_1.Type)(() => ingredient_schema_1.Ingredient),
    __metadata("design:type", Array)
], Pizza.prototype, "ingredients", void 0);
Pizza = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            getters: true,
            virtuals: true,
        },
    })
], Pizza);
exports.Pizza = Pizza;
exports.PizzaSchema = mongoose_1.SchemaFactory.createForClass(Pizza);
//# sourceMappingURL=pizza.schema.js.map