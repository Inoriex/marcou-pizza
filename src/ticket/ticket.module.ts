import { TicketSchema } from "./schema/ticket.schema";
import { TicketService } from "./ticket.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "@logger/logger.module";
import { TicketController } from "./ticket.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: "Ticket", schema: TicketSchema }])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
