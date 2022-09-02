import { BadRequestException, Injectable, NotFoundException, Req, MethodNotAllowedException, UnauthorizedException, Logger, HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { UserService } from "@user/user.service";

import { sign } from "jsonwebtoken";

import { User } from "@user/interfaces/user.interface";
import { ConfigService } from "@nestjs/config";
import { MailService } from "@mail/mail.service";

import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "./interfaces/refresh-token.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 } from "uuid";
import { getClientIp } from "request-ip";
import * as Cryptr from "cryptr";

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  cryptr: any;

  constructor(
    @InjectModel("RefreshToken") private readonly refreshTokenModel: Model<RefreshToken>,
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    // private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.configService.get<string>("FE_APP_URL");
    this.cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
  }
  /*


  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.userService.hashPassword(changePasswordDto.password);

    await this.userService.update(userId, { password });
    await this.tokenService.deleteAll(userId);
    return true;
  }

 */
  async createAccessToken(userId: string) {
    // const accessToken = this.jwtService.sign({userId});
    const accessToken = sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return this.encryptText(accessToken);
  }

  async createRefreshToken(@Req() req, userId) {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: v4(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this.refreshTokenModel.findOne({ refreshToken: token });
    if (!refreshToken) {
      throw new UnauthorizedException("User has been logged out.");
    }
    return refreshToken.userId;
  }
  /*   private async verifyToken(token): Promise<any> {
    const data = this.jwtService.verify(token) as ITokenPayload;
    const tokenExists = await this.tokenService.exists(data._id, token);

    if (tokenExists) {
      return data;
    }
    throw new UnauthorizedException();
  } */

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne({ _id: jwtPayload.userId, verified: true });
    if (!user) {
      throw new UnauthorizedException("User not found.");
    }
    return user;
  }

  /*   private saveToken(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    return this.tokenService.create(createUserTokenDto);
  } */

  /*  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException("Invalid email");
    }
    const token = await this.signUser(user);
    // await this.mailService.forgotPassword(user, token);
  } */

  //   ┬┬ ┬┌┬┐  ┌─┐─┐ ┬┌┬┐┬─┐┌─┐┌─┐┌┬┐┌─┐┬─┐
  //   ││││ │   ├┤ ┌┴┬┘ │ ├┬┘├─┤│   │ │ │├┬┘
  //  └┘└┴┘ ┴   └─┘┴ └─ ┴ ┴└─┴ ┴└─┘ ┴ └─┘┴└─
  private jwtExtractor(request) {
    let token = null;
    if (request.header("x-token")) {
      token = request.get("x-token");
    } else if (request.headers.authorization) {
      token = request.headers.authorization.replace("Bearer ", "").replace(" ", "");
    } else if (request.body.token) {
      token = request.body.token.replace(" ", "");
    }
    if (request.query.token) {
      token = request.body.token.replace(" ", "");
    }
    const cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
    if (token) {
      try {
        token = cryptr.decrypt(token);
      } catch (err) {
        throw new BadRequestException("Bad request.");
      }
    }
    return token;
  }

  // ***********************
  // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ***********************

  returnJwtExtractor() {
    return this.jwtExtractor;
  }

  getIp(@Req() req): string {
    return getClientIp(req);
  }

  getBrowserInfo(@Req() req): string {
    return req.headers["user-agent"] || "XX";
  }

  getCountry(@Req() req): string {
    return req.headers["cf-ipcountry"] ? req.headers["cf-ipcountry"] : "XX";
  }

  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
}
