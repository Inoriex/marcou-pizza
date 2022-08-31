import { MailerService } from "@nestjs-modules/mailer";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
import { User } from "@user/interfaces/user.interface";
export declare class MailService {
    private mailerService;
    private readonly clientAppUrl;
    private readonly apiUrl;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User): Promise<string>;
    forgotPassword(user: IReadableUser, token: string): Promise<void>;
}
