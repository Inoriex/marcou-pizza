import { Paiment } from "./../schema/paiment.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PaimentService {
  constructor(@InjectModel("paiment") private readonly paimentModel: Model<Paiment>) {}

  async createPaiment(paiment: string): Promise<Paiment> {
    const newPaiment = new this.paimentModel(paiment);
    return newPaiment.save();
  }

  async getTicket(paimentId: string): Promise<Paiment> {
    return await this.paimentModel.findById(paimentId).exec();
  }

  async getAllPaiment(): Promise<Paiment[]> {
    return await this.paimentModel.find({}).exec();
  }

  
}
