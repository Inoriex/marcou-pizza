import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
  getHelllo(email: string): string {
    return "Hello " + email + "!";
  }
}
