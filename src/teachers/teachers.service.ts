import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeachersService {

  constructor (
    private prisma: PrismaService
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = await this.prisma.teacher.create({ data: {
      ...createTeacherDto
    }});

    return newTeacher;
  }

  async findAll() {
    return await this.prisma.teacher.findMany();
  }

  async findOne(id: string) {
    const teacherFound = this.prisma.teacher.findUnique({ where: { idTeacher: id } });

    if (!teacherFound)
      throw new NotFoundException(`Profesor con ${id} no encontrado`);

    return teacherFound;
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  async remove(id: string) {
    return this.prisma.teacher.delete({ where: { idTeacher: id } });
  }
}
