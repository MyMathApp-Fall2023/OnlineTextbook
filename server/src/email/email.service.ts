import fs from "fs";
import path from "path";
import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import Handlebars from "handlebars";
import {UserService} from "../user/user.service";
import { User } from "../user/entities/user.entity";

type ActivateAccountParams = {
    name: string;
    email: string;
    storeDomain: string;
    activateAccountRoute: string;
    activationCode: string;
    contactRoute: string;
};

type ForgotPasswordParams = {
    name: string;
    email: string;
    temporaryPassword: string;
    storeDomain: string;
    resetPasswordRoute: string;
    contactRoute: string;
};

@Injectable()
export default class EmailService implements OnModuleDestroy {
    private readonly transporter: Mail;
    private readonly activateAccountTemplateDelegate: HandlebarsTemplateDelegate<ActivateAccountParams>;
    private readonly temporaryPasswordTemplateDelegate: HandlebarsTemplateDelegate<ForgotPasswordParams>;
    private readonly from?: string;

    public constructor(
        private readonly userService: UserService
    ) {
        if (process.env.EMAIL_ENABLE) {
            this.activateAccountTemplateDelegate = Handlebars.compile(
                fs
                    .readFileSync(path.join(__dirname, "templates", "activate-account.template.txt"))
                    .toString()
            );
            this.temporaryPasswordTemplateDelegate = Handlebars.compile(
                fs
                    .readFileSync(path.join(__dirname, "templates", "temporary-password.template.txt"))
                    .toString()
            );

            const port = Number(process.env["MAILGUN_PORT "]);
            const mailgunUsername = process.env["MAILGUN_USRNAME "];
            this.from = `MYMathApps <${mailgunUsername}>`;
            this.transporter = createTransport({
                host: process.env["MAILGUN_SERVER "],
                port: port,
                // 465 is the secure port for SMTP although research says it is deprecated.
                // Confirm with Mailgun.
                secure: port === 465 || port === 587,
                auth: {
                    user: mailgunUsername!,
                    pass: process.env["MAILGUN_PASSWORD "]
                }
            });

            if (!this.healthy()) {
                process.exit(1);
            } else {
                console.log("Email transport verified");
            }
        }
    }

    public onModuleDestroy(): void {
        if (process.env["EMAIL_ENABLE "]) {
            this.transporter.close();
        }
    }

    public async activateAccount(user: User): Promise<void> {
        console.log(process.env["EMAIL_ENABLE "])
        if (!process.env["EMAIL_ENABLE "]) {
            await this.userService.activateAccount(user.activationCode!);
            EmailService.logger.debug(
                `Activated account for ${user.email} with activation code ${user.activationCode}`
            );
            console.log("enabled");
            return;
        }
        console.log("already enabled");
        this.transporter
            .sendMail({
                from: this.from,
                to: user.email,
                subject: "Activate Account",
                text: this.activateAccountTemplateDelegate({
                    name: user.name,
                    email: user.email,
                    storeDomain: this.mymaConfigService.mymaStoreDomain,
                    activateAccountRoute: this.mymaConfigService.mymaActivateAccountRoute,
                    activationCode: user.activationCode!,
                    contactRoute: this.mymaConfigService.mymaContactRoute
                })
            })
            .then(() => EmailService.logger.debug(`Sent activate account email to ${user.email}`))
            .catch((e: Error) => EmailService.logger.error(e.message));
    }

    public async temporaryPassword(email: string): Promise<void> {
        const user = await this.userService.createTemporaryPasswordForUser(email);
        if (!this.mymaConfigService.mymaEmailEnabled) {
            EmailService.logger.debug(`Temporary password for ${email}: ${user.temporaryPassword}`);
            return;
        }

        this.transporter
            .sendMail({
                from: this.from,
                to: user.email,
                subject: "Temporary Password",
                text: this.temporaryPasswordTemplateDelegate({
                    name: user.name,
                    email: user.email,
                    temporaryPassword: user.temporaryPassword!,
                    storeDomain: this.mymaConfigService.mymaStoreDomain,
                    resetPasswordRoute: this.mymaConfigService.mymaResetPasswordRoute,
                    contactRoute: this.mymaConfigService.mymaContactRoute
                })
            })
            .then(() => EmailService.logger.debug(`Sent temporary password email to ${user.email}`))
            .catch((e: Error) => EmailService.logger.error(e.message));
    }

    public async healthy(): Promise<boolean> {
        try {
            return await this.transporter.verify();
        } catch (_e) {
            const e = _e as Error;
            EmailService.logger.error(e.message);
            return false;
        }
    }
}
