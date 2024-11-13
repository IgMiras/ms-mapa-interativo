import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Converte o payload para o tipo do DTO
      whitelist: true, // Remove propriedades não declaradas no DTO
      forbidNonWhitelisted: true, // Lança erro se houver campos extras no body
      errorHttpStatusCode: 400, // Define o status de erro para 400 (Bad Request)
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((err) => ({
            field: err.property,
            issues: Object.values(err.constraints),
          })),
        );
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
