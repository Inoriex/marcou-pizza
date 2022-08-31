import { User } from "@user/interfaces/user.interface";
import * as _ from "lodash";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { Address } from "@user/schemas/address.schema";
import { CreateAddressDto } from "@user/dto/create-address.dto";
import { ResetPasswordDto } from "@user/dto/reset-password.dto";
import { AuthService } from "@auth/auth.service";
import { LoginUserDto } from "@user/dto/login-user.dto";
import { Injectable, BadRequestException, Req, NotFoundException, ConflictException, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 } from "uuid";
import { addHours } from "date-fns";
import * as bcrypt from "bcrypt";
import { CreateForgotPasswordDto } from "@user/dto/create-forgot-password.dto";
import { VerifyUuidDto } from "@user/dto/verify-uuid.dto";
import { RefreshAccessTokenDto } from "@user/dto/refresh-access-token.dto";
import { ForgotPassword } from "@user/interfaces/forgot-password.interface";
import { MailService } from "@/mail/mail.service";
import { Response } from "express";
@Injectable()
export class UserService {
  HOURS_TO_VERIFY = 4;
  HOURS_TO_BLOCK = 6;
  LOGIN_ATTEMPTS_TO_BLOCK = 5;

  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    @InjectModel("ForgotPassword") private readonly forgotPasswordModel: Model<ForgotPassword>,
    @InjectModel("Address") private readonly addressModel: Model<Address>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
  // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
  // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto);
      await this.isEmailUnique(user.email);
      this.setRegistrationInfo(user);
      await user.save();
      this.mailService.sendUserConfirmation(user);
      return this.buildRegistrationInfo(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬  ┌─┐┌┬┐┌─┐┬┬
  // └┐┌┘├┤ ├┬┘│├┤ └┬┘  ├┤ │││├─┤││
  //  └┘ └─┘┴└─┴└   ┴   └─┘┴ ┴┴ ┴┴┴─┘
  async verifyEmail(@Req() req, verifyUuidDto: string) {
    try {
      const user = await this.findByVerification(verifyUuidDto);
      await this.setUserAsVerified(user);
      const token = {
        fullName: user.fullName,
        email: user.email,
        accessToken: await this.authService.createAccessToken(user._id),
        refreshToken: await this.authService.createRefreshToken(req, user._id),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ┬  ┌─┐┌─┐┬┌┐┌
  // │  │ ││ ┬││││
  // ┴─┘└─┘└─┘┴┘└┘
  async login(@Req() req, loginUserDto: LoginUserDto) {
    try {
      const email = loginUserDto.email;
      const existingUser = await this.userModel.findOne({ email, verified: false });
      if (existingUser) {
        return await existingUser.updateOne({
          $set: {
            verificationExpires: addHours(new Date(), this.HOURS_TO_VERIFY),
          },
        });
      }
      const user = await this.findUserByEmail(loginUserDto.email);
      this.isUserBlocked(user);
      await this.checkPassword(loginUserDto.password, user);
      await this.passwordsAreMatch(user);
      return {
        fullName: user.fullName,
        email: user.email,
        accessToken: await this.authService.createAccessToken(user._id),
        refreshToken: await this.authService.createRefreshToken(req, user._id),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ┬─┐┌─┐┌─┐┬─┐┌─┐┌─┐┬ ┬  ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐  ┌┬┐┌─┐┬┌─┌─┐┌┐┌
  // ├┬┘├┤ ├┤ ├┬┘├┤ └─┐├─┤  ├─┤│  │  ├┤ └─┐└─┐   │ │ │├┴┐├┤ │││
  // ┴└─└─┘└  ┴└─└─┘└─┘┴ ┴  ┴ ┴└─┘└─┘└─┘└─┘└─┘   ┴ └─┘┴ ┴└─┘┘└┘

  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
    try {
      const userId = await this.authService.findRefreshToken(refreshAccessTokenDto.refreshToken);
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new BadRequestException("Bad request");
      }
      return {
        accessToken: await this.authService.createAccessToken(user._id),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ┌─┐┌─┐┬─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐
  // ├┤ │ │├┬┘│ ┬│ │ │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││
  // └  └─┘┴└─└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘
  async forgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
    try {
      await this.findByEmail(createForgotPasswordDto.email);
      await this.saveForgotPassword(req, createForgotPasswordDto);
      return {
        email: createForgotPasswordDto.email,
        message: "verification sent.",
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ┌─┐┌─┐┬─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐  ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬
  // ├┤ │ │├┬┘│ ┬│ │ │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││  └┐┌┘├┤ ├┬┘│├┤ └┬┘
  // └  └─┘┴└─└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘   └┘ └─┘┴└─┴└   ┴
  async forgotPasswordVerify(req: Request, verifyUuidDto: VerifyUuidDto) {
    try {
      const forgotPassword = await this.findForgotPasswordByUuid(verifyUuidDto);
      await this.setForgotPasswordFirstUsed(req, forgotPassword);
      return {
        email: forgotPassword.email,
        message: "now reset your password.",
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ┬─┐┌─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐
  // ├┬┘├┤ └─┐├┤  │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││
  // ┴└─└─┘└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const forgotPassword = await this.findForgotPasswordByEmail(resetPasswordDto);
      await this.setForgotPasswordFinalUsed(forgotPassword);
      await this.resetUserPassword(resetPasswordDto);
      return {
        email: resetPasswordDto.email,
        message: "password successfully changed.",
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // ┌─┐┬─┐┌─┐┌┬┐┌─┐┌─┐┌┬┐┌─┐┌┬┐  ┌─┐┌─┐┬─┐┬  ┬┬┌─┐┌─┐
  // ├─┘├┬┘│ │ │ ├┤ │   │ ├┤  ││  └─┐├┤ ├┬┘└┐┌┘││  ├┤
  // ┴  ┴└─└─┘ ┴ └─┘└─┘ ┴ └─┘─┴┘  └─┘└─┘┴└─ └┘ ┴└─┘└─┘
  findAll(): any {
    return { hello: "world" };
  }

  // ********************************************
  // ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ********************************************

  private async isEmailUnique(email: string) {
    try {
      const user = await this.userModel.findOne({ email, verified: true });
      if (user) {
        throw new BadRequestException("Email most be unique.");
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private setRegistrationInfo(user): any {
    user.verification = v4();
    user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY);
  }

  private buildRegistrationInfo(user): any {
    const userRegistrationInfo = {
      fullName: user.fullName,
      email: user.email,
      verified: user.verified,
    };
    return userRegistrationInfo;
  }

  private async findByVerification(verification: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ verification, verified: false, verificationExpires: { $gt: new Date() } });
      if (!user) {
        throw new BadRequestException("Bad request.");
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email, verified: true });
      if (!user) {
        throw new NotFoundException("Email not found.");
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async setUserAsVerified(user) {
    user.verified = true;
    await user.save();
  }

  private async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email, verified: true });
      if (!user) {
        throw new NotFoundException("Wrong email or password.");
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async checkPassword(attemptPass: string, user) {
    try {
      const match = await bcrypt.compare(attemptPass, user.password);
      if (!match) {
        await this.passwordsDoNotMatch(user);
        throw new NotFoundException("Wrong email or password.");
      }
      return match;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private isUserBlocked(user) {
    if (user.blockExpires > Date.now()) {
      throw new ConflictException("User has been blocked try later.");
    }
  }

  private async passwordsDoNotMatch(user) {
    user.loginAttempts += 1;
    await user.save();
    if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
      await this.blockUser(user);
      throw new ConflictException("User blocked.");
    }
  }

  private async blockUser(user) {
    user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
    await user.save();
  }

  private async passwordsAreMatch(user) {
    user.loginAttempts = 0;
    await user.save();
  }

  private async saveForgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
    try {
      const forgotPassword = await this.forgotPasswordModel.create({
        email: createForgotPasswordDto.email,
        verification: v4(),
        expires: addHours(new Date(), this.HOURS_TO_VERIFY),
        ip: this.authService.getIp(req),
        browser: this.authService.getBrowserInfo(req),
        country: this.authService.getCountry(req),
      });
      await forgotPassword.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async findForgotPasswordByUuid(verifyUuidDto: VerifyUuidDto): Promise<ForgotPassword> {
    try {
      const forgotPassword = await this.forgotPasswordModel.findOne({
        verification: verifyUuidDto.verification,
        firstUsed: false,
        finalUsed: false,
        expires: { $gt: new Date() },
      });
      if (!forgotPassword) {
        throw new BadRequestException("Bad request.");
      }
      return forgotPassword;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async setForgotPasswordFirstUsed(req: Request, forgotPassword: ForgotPassword) {
    try {
      forgotPassword.firstUsed = true;
      forgotPassword.ipChanged = this.authService.getIp(req);
      forgotPassword.browserChanged = this.authService.getBrowserInfo(req);
      forgotPassword.countryChanged = this.authService.getCountry(req);
      await forgotPassword.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async findForgotPasswordByEmail(resetPasswordDto: ResetPasswordDto): Promise<ForgotPassword> {
    try {
      const forgotPassword = await this.forgotPasswordModel.findOne({
        email: resetPasswordDto.email,
        firstUsed: true,
        finalUsed: false,
        expires: { $gt: new Date() },
      });
      if (!forgotPassword) {
        throw new BadRequestException("Bad request.");
      }
      return forgotPassword;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async setForgotPasswordFinalUsed(forgotPassword: ForgotPassword) {
    forgotPassword.finalUsed = true;
    await forgotPassword.save();
  }

  private async resetUserPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.userModel.findOne({
        email: resetPasswordDto.email,
        verified: true,
      });
      user.password = resetPasswordDto.password;
      await user.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async find(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).populate("addresses").exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, payload: Partial<User>) {
    try {
      return this.userModel.updateOne({ _id: id }, payload).populate("addresses");
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createAddress(address: CreateAddressDto): Promise<Address> {
    try {
      const existingAddress = await this.addressModel.find(address).exec();
      if (existingAddress && existingAddress.length > 0) {
        return existingAddress[0];
      }
      const newAddress = await new this.addressModel(address);
      return newAddress.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addAddress(address: CreateAddressDto, userId: string) {
    try {
      let addressId;
      const existingAddress = await this.addressModel.find(address).exec();
      const user = await this.userModel.findById({ _id: userId }).exec();
      if (existingAddress && existingAddress.length > 0) {
        addressId = existingAddress[0]._id;
        if (!user.addresses.includes(addressId)) {
          user.addresses.push(addressId);
          return await user.save();
        }
      } else {
        const newAddress = new this.addressModel(address);
        newAddress.save();
        addressId = newAddress._id;
        user.addresses.push(addressId);
        return await user.save();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // Irrelevant
  async getAllAddress(): Promise<Address[]> {
    try {
      return await this.addressModel.find({}).populate("user").exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAddress(addressId: string): Promise<Address> {
    return await this.addressModel.findById(addressId).populate("user");
  }
  async getUserAddresses(userId: string) {
    try {
      return await this.userModel
        .findById({ _id: userId })
        .populate({
          path: "addresses",
          populate: {
            path: "_id",
            model: "Address",
          },
        })
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateAddress(addressId: string, payload: Partial<CreateAddressDto>, userId: string): Promise<Address> {
    try {
      return this.userModel.updateOne({ _id: addressId, user: userId }, payload).populate("user");
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteAddress(addressId: string, userId: string) {
    try {
      await this.userModel.updateOne({ _id: addressId, user: userId });
      return await this.userModel.findByIdAndDelete(addressId, { active: false });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
