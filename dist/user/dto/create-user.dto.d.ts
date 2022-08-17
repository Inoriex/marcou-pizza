export declare class CreateUserDto {
    readonly email: string;
    readonly avatar?: string;
    readonly avatarId?: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly addresses: string[];
    readonly phone: string;
    readonly roles: string[];
    readonly password: string;
}
export interface Address {
    address: string;
}
