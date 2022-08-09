import { IAddress } from "./address.interface";

export interface IReadableUser {
  readonly email: string;
  readonly avatar: string;
  readonly avatarId: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly phone: string;
  readonly gender: string;
  readonly addresses: IAddress[];
  readonly roles: string[];
  readonly verified: boolean;
  readonly verificationExpires: Date;
  readonly loginAttemps: number;
  readonly blockExpires: Date;
  accessToken?: string;
}
