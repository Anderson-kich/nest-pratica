import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Usado para remover os dados de entrada que não forem usados
      forbidNonWhitelisted: true, //Usado para retornar um erro se houver dados de entrada que não forem usados
      transform: false, //Usado para converter os dados de entrada para o formato correto
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
