import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './configuration/app/app.config';
import { SwaggerConfig } from './configuration/swagger/services/swagger.config';
import * as basicAuth from 'express-basic-auth';
import { ResponseOkInterceptor } from './interceptors/response-ok.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { UserClaimGuard } from './guards/user-claim.guard';
import { ThrottlerGuard } from "@nestjs/throttler";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseOkInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfig = app.get<AppConfig>(AppConfig);
  const swaggerConfig = app.get<SwaggerConfig>(SwaggerConfig);
  if (appConfig.mode == 'developer') {
    swaggerConfig.initialize(app);
    app.use(['/docs'],
      basicAuth({
        challenge: true,
        users: { 'mohammad': '11538832' },
      }));
  }


  await app.listen(appConfig.port);
}

bootstrap();
