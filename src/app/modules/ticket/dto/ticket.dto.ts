import { IsString, IsNotEmpty } from "class-validator";

export class createTicketDTO {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  ticket: string;

  @IsString()
  userId: string;
}
