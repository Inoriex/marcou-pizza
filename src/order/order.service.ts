import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "@order/schemas/order.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OrderService {
  constructor(@InjectModel("Order") private readonly orderModel: Model<Order>) {}
  async create(createOrderDto: CreateOrderDto) {
    return await new this.orderModel(createOrderDto).save();
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
