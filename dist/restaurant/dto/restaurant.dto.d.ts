import { CreateAddressDto } from "@user/dto/create-address.dto";
export declare class RestaurantDTO {
    title: string;
    image?: string;
    ceo: string;
    tel: string;
    horaires: string;
    description?: string;
    address: CreateAddressDto;
}
export declare class CreateRestaurantDTO {
    title: string;
    image?: string;
    ceo: string;
    tel: string;
    description?: string;
    horaires: string;
    address: string;
}
