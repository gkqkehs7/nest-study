import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllMiddleware } from './middlewares/all.middleware';
import { AuthGuard } from './Guards/Auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false 로그 비활성화
  });
  app.use(AllMiddleware);
  // app.useGlobalGuards(new AuthGuard()); // 전역으로 가드 사용하는 방법
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // class-transformer가 적용되게 하기 위함
    }),
  );
  await app.listen(3000);
}
bootstrap();
