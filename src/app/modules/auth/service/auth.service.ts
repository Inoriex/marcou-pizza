import { BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException, Logger, HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as _ from "lodash";
import * as moment from "moment";

import { UserService } from "@user/service/user.service";
import { TokenService } from "@token/service/token.service";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { SignOptions } from "jsonwebtoken";
import { CreateUserTokenDto } from "@token/dto/create-user-token.dto";
import { roleEnum } from "@user/enums/role.enum";
import { IUser } from "@user/interfaces/user.interface";
import { ConfigService } from "@nestjs/config";
import { MailService } from "@mail/service/mail.service";
import { statusEnum } from "@user/enums/status.enum";
import { SignInDto } from "@auth/dto/signin.dto";
import { ITokenPayload } from "@auth/interfaces/token-payload.interface";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
import { ChangePasswordDto } from "@auth/dto/change-password.dto";
import { userSensitiveFieldsEnum } from "@user/enums/protected-fields.enum";
import { ForgotPasswordDto } from "@auth/dto/forgot-password.dto";
import { IUserToken } from "@token/interfaces/user-token.interface";
import { JwtService } from "@nestjs/jwt";
import MongoError from "@/utils/mongoError.enum";

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.configService.get<string>("FE_APP_URL");
  }
  // Rajouter l'addresse
  async signUp(createUserDto: CreateUserDto): Promise<boolean | void> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    try {
      await this.userService.create(createUserDto, [roleEnum.user]);
    } catch (error) {
      if (error?.code === MongoError.DuplicateKey) {
        throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // await this.mailService.sendUserConfirmation(user, token);

  async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.signUser(user);
      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;

      return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;
    }
    throw new BadRequestException("Invalid credentials");
  }

  async signUser(user: IUser, withStatusCheck = true): Promise<string> {
    if (withStatusCheck && user.status !== statusEnum.active) {
      throw new MethodNotAllowedException();
    }
    const tokenPayload: ITokenPayload = {
      _id: user._id,
      status: user.status,
      roles: user.roles,
    };
    const token = await this.generateToken(tokenPayload);
    const expireAt = moment().add(1, "day").toISOString();

    await this.saveToken({
      token,
      expireAt,
      uId: user._id,
    });

    return token;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.userService.hashPassword(changePasswordDto.password);

    await this.userService.update(userId, { password });
    await this.tokenService.deleteAll(userId);
    return true;
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.find(data._id);

    await this.tokenService.delete(data._id, token);

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }
    throw new BadRequestException("Confirmation error");
  }

  private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    const data = this.jwtService.verify(token) as ITokenPayload;
    const tokenExists = await this.tokenService.exists(data._id, token);

    if (tokenExists) {
      return data;
    }
    throw new UnauthorizedException();
  }

  private saveToken(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    return this.tokenService.create(createUserTokenDto);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException("Invalid email");
    }
    const token = await this.signUser(user);
    // await this.mailService.forgotPassword(user, token);
  }
}
