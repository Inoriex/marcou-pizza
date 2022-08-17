import { JwtPayload } from "./../interfaces/jwt-payload.interface";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(jwtPayload: JwtPayload): Promise<any>;
}
export {};
