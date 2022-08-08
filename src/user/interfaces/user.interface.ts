import { Document } from "mongoose";
import { IAddress } from "./address.interface";

export interface User extends Document {
  readonly email: string;
  status: string;
  readonly avatar: string;
  readonly avatarId: string;
  readonly fullName: string;
  readonly gender: string;
  readonly address: IAddress;
  readonly phone: string;
  password: string;
  readonly roles: [string];
  readonly verification: string;
  readonly verified: boolean;
  readonly verificationExpires: Date;
  readonly loginAttempts?: number;
  readonly blockExpires?: Date;
}
