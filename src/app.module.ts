import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Logger2Middleware } from './middlewares/logger2.middleware';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwtConfig';
import { AuthGuard } from './Guards/Auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, jwtConfig],
      isGlobal: true,
      // validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      migrationsRun: false,
      migrations: [__dirname + '/**/migrations/*.js'], // 마이그레이션을 수행할 파일이 관리되는 경로
      migrationsTableName: 'migrations', // 마이그레이션 이력이 기록되는 테이블 이름
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 나열된 순서대로 middleware 적용
    consumer.apply(LoggerMiddleware, Logger2Middleware).forRoutes('/users');
  }
}
