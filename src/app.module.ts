import { Module } from '@nestjs/common';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClassroomsModule, 
    TeachersModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})
export class AppModule {}
