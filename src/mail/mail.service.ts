import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
import { User } from "@user/interfaces/user.interface";

@Injectable()
export class MailService {
  private readonly clientAppUrl: string;
  private readonly apiUrl: string;

  constructor(private mailerService: MailerService) {
    this.clientAppUrl = process.env.API_URL;
    this.apiUrl = process.env.CLIENT_APP_URL;
  }

  async sendUserConfirmation(user: User) {
    try {
      const url = `${this.apiUrl}user/verify-email?verification=${user.verification}`;
      await this.mailerService.sendMail({
        to: user.email,
        subject: "Bienvenue sur Marcau Pizza ! Confirmez votre adresse email",
        template: "confirmation",
        context: {
          name: `${user.fullName}`,
          url,
        },
      });
      return "success";
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
