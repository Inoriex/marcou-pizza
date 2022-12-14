import { User } from "@user/interfaces/user.interface";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { Address } from "@user/schemas/address.schema";
import { CreateAddressDto } from "@user/dto/create-address.dto";
import { ResetPasswordDto } from "@user/dto/reset-password.dto";
import { AuthService } from "@auth/auth.service";
import { LoginUserDto } from "@user/dto/login-user.dto";
import { Model } from "mongoose";
import { CreateForgotPasswordDto } from "@user/dto/create-forgot-password.dto";
import { VerifyUuidDto } from "@user/dto/verify-uuid.dto";
import { RefreshAccessTokenDto } from "@user/dto/refresh-access-token.dto";
import { ForgotPassword } from "@user/interfaces/forgot-password.interface";
import { MailService } from "@/mail/mail.service";
export declare class UserService {
    private readonly userModel;
    private readonly forgotPasswordModel;
    private readonly addressModel;
    private readonly authService;
    private readonly mailService;
    HOURS_TO_VERIFY: number;
    HOURS_TO_BLOCK: number;
    LOGIN_ATTEMPTS_TO_BLOCK: number;
    constructor(userModel: Model<User>, forgotPasswordModel: Model<ForgotPassword>, addressModel: Model<Address>, authService: AuthService, mailService: MailService);
    create(createUserDto: CreateUserDto): Promise<User>;
    verifyEmail(req: any, verifyUuidDto: string): Promise<void>;
    resendEmail(email: string): Promise<Partial<User["verification"]>>;
    login(req: any, loginUserDto: LoginUserDto): Promise<any>;
    refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto): Promise<{
        accessToken: string;
    }>;
    forgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto): Promise<{
        email: string;
        message: string;
    }>;
    forgotPasswordVerify(req: Request, verifyUuidDto: VerifyUuidDto): Promise<{
        email: string;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        email: string;
        message: string;
    }>;
    findAll(): any;
    private isEmailUnique;
    private setRegistrationInfo;
    private buildRegistrationInfo;
    private findByVerification;
    private findByEmail;
    private setUserAsVerified;
    private findUserByEmail;
    private checkPassword;
    private isUserBlocked;
    private passwordsDoNotMatch;
    private blockUser;
    private passwordsAreMatch;
    private saveForgotPassword;
    private findForgotPasswordByUuid;
    private setForgotPasswordFirstUsed;
    private findForgotPasswordByEmail;
    private setForgotPasswordFinalUsed;
    private resetUserPassword;
    find(id: string): Promise<User>;
    update(id: string, payload: Partial<User>): Promise<import("mongodb").UpdateResult>;
    createAddress(address: CreateAddressDto): Promise<Address>;
    addAddress(address: CreateAddressDto, userId: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllAddress(): Promise<Address[]>;
    getAddress(addressId: string): Promise<Address>;
    getUserAddresses(userId: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateAddress(addressId: string, payload: Partial<CreateAddressDto>, userId: string): Promise<Address>;
    deleteAddress(addressId: string, userId: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
