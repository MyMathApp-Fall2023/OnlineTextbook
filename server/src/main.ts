import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  console.log('READY LISTEN' + configService.get<string>('SERVER_PORT'))
  await app.listen(configService.get<string>('SERVER_PORT'));
}
bootstrap();
