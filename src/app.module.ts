import { Module } from '@nestjs/common';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [ClassroomsModule, TeachersModule],
})
export class AppModule {}
