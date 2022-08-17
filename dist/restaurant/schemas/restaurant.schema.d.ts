import mongoose, { Document } from "mongoose";
import { Address } from "@user/schemas/address.schema";
export declare type RestaurantDocument = Restaurant & Document;
export declare class Restaurant extends Document {
    _id: string;
    title: string;
    image?: string;
    ceo: string;
    tel: string;
    horaires: string;
    address: Address;
}
export declare const RestaurantSchema: mongoose.Schema<Restaurant, mongoose.Model<Restaurant, any, any, any, any>, {}, {}, {}, {}, "type", Restaurant>;
