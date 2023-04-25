import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('bootstrap'); // create a new logger instance

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);

  await app.listen(process.env.PORT || configService.get<string>('SERVER_PORT'),()=>{
    logger.log('Ready Listen' + configService.get<string>('SERVER_PORT'))
    logger.log('MyMathApp Server Application started'); // log a message using the logger instance
    logger.log('MyMathApp Server running at ' + configService.get<string>('ENV_TYPE') + ' Mode')
  });
}
bootstrap();
