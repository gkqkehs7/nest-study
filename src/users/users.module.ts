import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule], // 다른 모듈 import 할건지 여부
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
