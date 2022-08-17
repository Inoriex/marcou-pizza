import { IAddress } from "../interfaces/address.interface";
export declare class CreateUserDto {
    readonly email: string;
    readonly avatar?: string;
    readonly avatarId?: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly address: IAddress;
    readonly phone: string;
    readonly roles: string[];
    readonly password: string;
}
