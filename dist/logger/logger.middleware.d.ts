import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { Logger } from "./logger";
export declare class LoggerMiddleware implements NestMiddleware<Request, Response> {
    private logger;
    constructor(logger: Logger);
    use(req: Request, res: Response, next: () => void): any;
    private getResponseSize;
    private generateLogMessage;
}
