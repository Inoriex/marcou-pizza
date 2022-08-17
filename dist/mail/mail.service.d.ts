import { MailerService } from "@nestjs-modules/mailer";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { IReadableUser } from "@user/interfaces/readable-user.interface";
export declare class MailService {
    private mailerService;
    private readonly clientAppUrl;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: CreateUserDto, token: string): Promise<void>;
    forgotPassword(user: IReadableUser, token: string): Promise<void>;
}
