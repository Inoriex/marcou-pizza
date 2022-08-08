import { User } from "@user/schema/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Transform, Type } from "class-transformer";
import { orderStatus } from "@order/enums/order-status.enum";
import { pizzaSize } from "@order/enums/pizza-size.enum";
export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  articles: {
    articleId: { type: MongooseSchema.Types.ObjectId; ref: "Pizza" };
    quantity: number;
    taille: { type: string; enum: pizzaSize };
    totalArticlePrice: number;
  }[];

  @Prop()
  totalTTC: number;

  @Prop({ type: String, enum: Object.values(orderStatus), default: orderStatus.pending })
  status: orderStatus;

  @Prop()
  payment: string;

  /*
  @Prop()
  paymentStatus: string; */

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  @Type(() => User)
  client: User;

  @Prop({ default: new Date() })
  date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
