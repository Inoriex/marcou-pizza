import { UserService } from "@user/user.service";
import { CreateAddressDto } from "@user/dto/create-address.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CreateForgotPasswordDto } from "./dto/create-forgot-password.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user-address.dto";
import { VerifyUuidDto } from "./dto/verify-uuid.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { User } from "@user/interfaces/user.interface";
import { Response } from "express";
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
    DeleteUserAddress(user: User, addressId: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    register(createUserDto: CreateUserDto): Promise<User>;
    verifyEmail(req: any, res: Response, query: {
        verification: string;
    }): Promise<{
        url: string;
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
