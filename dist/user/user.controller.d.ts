/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from "@user/user.service";
import { CreateAddressDto } from "@user/dto/create-address.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CreateForgotPasswordDto } from "./dto/create-forgot-password.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user-address.dto";
import { VerifyUuidDto } from "./dto/verify-uuid.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { User } from "@user/interfaces/user.interface";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    me(request: any): Promise<User>;
    getUserAddresses(user: User): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    CreateUserAddress(req: any, user: User, address: CreateAddressDto): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    UpdateUserAddress(user: User, address: Partial<CreateAddressDto>, addressId: string): Promise<import("./schemas/address.schema").Address>;
    DeleteUserAddress(user: User, addressId: string): Promise<import("mongodb").UpdateResult | (User & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    register(createUserDto: CreateUserDto): Promise<User>;
    verifyEmail(req: any, query: {
        verification: string;
    }): Promise<{
        fullName: string;
        email: string;
        accessToken: string;
        refreshToken: string;
    }>;
    login(req: any, loginUserDto: LoginUserDto): Promise<any>;
    refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto): Promise<{
        accessToken: string;
    }>;
    forgotPassword(req: any, createForgotPasswordDto: CreateForgotPasswordDto): Promise<{
        email: string;
        message: string;
    }>;
    forgotPasswordVerify(req: any, verifyUuidDto: VerifyUuidDto): Promise<{
        email: string;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        email: string;
        message: string;
    }>;
    findAll(): any;
}
