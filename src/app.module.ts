import { Module } from '@nestjs/common';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClassroomsModule, TeachersModule, AuthModule],
})
export class AppModule {}
