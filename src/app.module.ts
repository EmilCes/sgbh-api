import { Module } from '@nestjs/common';
import { ClassroomsModule } from './classrooms/classrooms.module';

@Module({
  imports: [ClassroomsModule],
})
export class AppModule {}
