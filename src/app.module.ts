import { Module } from '@nestjs/common';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ClassroomsModule, 
    TeachersModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ],
})
export class AppModule {}
