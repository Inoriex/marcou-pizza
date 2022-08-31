import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
import { User } from '@user/interfaces/user.interface';

@Injectable()
export class MailService {
  private readonly clientAppUrl: string;

  constructor(private mailerService: MailerService) {
    this.clientAppUrl = process.env.CLIENT_APP_URL;
  }

  async sendUserConfirmation(user: User ) {
    const url = `${this.clientAppUrl}user/verify-email?verification=${user.verification}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Bienvenue sur Marcau Pizza ! Confirmez votre adresse email",
      template:"confirmation",
      context: {
        name: `${user.fullName}`,
        url,
      },
    });
    return "success";
  }
  async forgotPassword(user: IReadableUser, token: string): Promise<void> {
    const url = `${this.clientAppUrl}/auth/forgotPassword?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Mot de passe oublié",
      template: "/forgot-password",
      context: {
        name: `${user.firstName} ${user.lastName}`,
        url,
      },
    });
  }
}
