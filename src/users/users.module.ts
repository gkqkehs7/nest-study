import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity])], // 다른 모듈 import 할건지 여부
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
