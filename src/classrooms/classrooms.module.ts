import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ClassroomsController],
  providers: [ClassroomsService, PrismaService],
  imports: [AuthModule]
})
export class ClassroomsModule {}
