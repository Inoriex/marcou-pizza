import mongoose, { Document } from "mongoose";
import { genderEnum } from "@user/enums/gender.enum";
import { roleEnum } from "@user/enums/role.enum";
import { Address } from "./address.schema";
export declare type UserDocument = User & Document;
export declare class User {
    static passwordMinLength: number;
    _id: string;
    email: string;
    avatar: string;
    avatarId: string;
    lastName: string;
    firstName: string;
    gender: genderEnum;
    phone: string;
    roles: roleEnum;
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttemps: number;
    blockExpires: Date;
    password: string;
    addresses?: {
        address: Address;
    }[];
    constructor(partial: Partial<User>);
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
