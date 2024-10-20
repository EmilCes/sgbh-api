import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: true,
    methods: 'GET, PUT, POST, DELETE',
    credentials: true
  });
  await app.listen(3002);
}

bootstrap();
