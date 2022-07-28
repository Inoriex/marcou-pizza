import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";
import RefreshToken from "./entities/refresh-token.entity";
import { sign, verify } from "jsonwebtoken";
import { Auth, google } from "googleapis";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];
  private oauthClient: Auth.OAuth2Client;

  constructor(private readonly UsersService: UsersService) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.UsersService.findOne(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  }

  private retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === "string") {
        return undefined;
      }
      return Promise.resolve(this.refreshTokens.find(token => token.id === decoded.id));
    } catch (e) {
      return undefined;
    }
  }

  async loginGoogleUser(token: string, values: { userAgent: string; ipAddress: string }): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const user = await this.UsersService.findByEmail(tokenInfo.email);
    if (user) {
      return this.newRefreshAndAccessToken(user, values);
    }
    return undefined;
  }

  async login(email: string, password: string, values: { userAgent: string; ipAddress: string }): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.UsersService.findByEmail(email);
    if (!user) {
      return undefined;
    }
    // verify your user -- use argon2 for password hashing!!
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(user: User, values: { userAgent: string; ipAddress: string }): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id: this.refreshTokens.length === 0 ? 0 : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "1h",
        },
      ),
    };
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(refreshToken => refreshToken.id !== refreshToken.id);
  }
}
