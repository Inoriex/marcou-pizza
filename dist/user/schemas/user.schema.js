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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const gender_enum_1 = require("../enums/gender.enum");
const role_enum_1 = require("../enums/role.enum");
const bcrypt = require("bcrypt");
const validator = require("validator");
let User = User_1 = class User {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
User.passwordMinLength = 7;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(255),
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatarId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: Object.values(gender_enum_1.genderEnum) }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true, enum: Object.values(role_enum_1.roleEnum), default: ["user"] }),
    __metadata("design:type", String)
], User.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ validate: validator.isUUID }),
    __metadata("design:type", String)
], User.prototype, "verification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "verificationExpires", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "loginAttemps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "blockExpires", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.MinLength)(User_1.passwordMinLength),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ address: { type: mongoose_2.Schema.Types.ObjectId, ref: "Address" } }],
    }),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
User = User_1 = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index({ firstName: "text", lastName: "text" });
exports.UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const hashed = await bcrypt.hash(this["password"], 10);
        this["password"] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user.schema.js.map