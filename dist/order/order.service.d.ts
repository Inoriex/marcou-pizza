import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "@order/schemas/order.schema";
import { Model } from "mongoose";
export declare class OrderService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    create(createOrderDto: CreateOrderDto): Promise<Order & Required<{
        _id: string;
    }>>;
    findAll(): string;
    findOne(id: number): string;
}
