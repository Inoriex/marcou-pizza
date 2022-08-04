
import { IsString, IsNotEmpty } from "class-validator";

export class createTicketDTO {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  userId: string;
}

export class createTicketDTO {}

