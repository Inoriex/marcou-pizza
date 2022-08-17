import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "@user/interfaces/user.interface";
import { ConfigService } from "@nestjs/config";
import { MailService } from "@mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "./interfaces/refresh-token.interface";
import { Model } from "mongoose";
export declare class AuthService {
    private readonly refreshTokenModel;
    private readonly userModel;
    private readonly jwtService;
    private readonly configService;
    private readonly mailService;
    private readonly clientAppUrl;
    cryptr: any;
    constructor(refreshTokenModel: Model<RefreshToken>, userModel: Model<User>, jwtService: JwtService, configService: ConfigService, mailService: MailService);
    createAccessToken(userId: string): Promise<string>;
    createRefreshToken(req: any, userId: any): Promise<string>;
    findRefreshToken(token: string): Promise<User>;
    validateUser(jwtPayload: JwtPayload): Promise<any>;
    private jwtExtractor;
    returnJwtExtractor(): (request: any) => any;
    getIp(req: any): string;
    getBrowserInfo(req: any): string;
    getCountry(req: any): string;
    encryptText(text: string): string;
}
