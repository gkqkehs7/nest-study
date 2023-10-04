import { Injectable } from '@nestjs/common';
import uuid from 'uuid';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async login(email: string, password: string): Promise<string> {
    throw new Error('ss');
  }

  private checkUserExists(email: string) {
    return false;
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
  }

  // private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {}
}
