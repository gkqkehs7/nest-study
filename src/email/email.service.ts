import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import emailConfig from '../config/emailConfig';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    sigupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        <div>good</div>
      `,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
