import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService],
  imports: [AuthModule]
})
export class TeachersModule {}
