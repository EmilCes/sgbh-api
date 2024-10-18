import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeachersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createTeacherDto: CreateTeacherDto) {

    const existingTeacher = await this.prisma.teacher.findUnique({
      where: {
        personalNumber: createTeacherDto.personalNumber
      }
    });

    if (existingTeacher) {
      throw new ConflictException(`El numero de personal ya esta registrado.`);
    }

    const newTeacher = await this.prisma.teacher.create({
      data: {
        ...createTeacherDto
      }
    });

    return newTeacher;
  }

  async findAll(page: number, limit: number, searchTerm?: string) {

    const where = searchTerm
      ? {
        OR: [
          { name: {startsWith: searchTerm } }
        ]
      }
      : {};

    const total = await this.prisma.teacher.count({
      where
    });

    const teachersbD = await this.prisma.teacher.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit
    });

    const teachers = teachersbD.map(teacher => {
      return {
        ...teacher,
        birthdate: teacher.birthdate 
          ? teacher.birthdate.toISOString().split('T')[0]
          : null,
        uvAdmissionDate: teacher.uvAdmissionDate
          ? teacher.uvAdmissionDate.toISOString().split('T')[0]
          : null
      }
    });

    return { teachers, total };
  }

  async findOne(id: string) {
    const teacherFound = this.prisma.teacher.findUnique({ where: { idTeacher: id } });

    if (!teacherFound)
      throw new NotFoundException(`Profesor con ${id} no encontrado`);

    return teacherFound;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
      const existingTeacher = await this.prisma.teacher.findUnique({
        where: {
          idTeacher: id
        }
      });

      if (!existingTeacher) {
        throw new NotFoundException(`Profesor no encontrado.`)
      }

      const otherTeacher = await this.prisma.teacher.findUnique({
        where: {
          personalNumber: updateTeacherDto.personalNumber
        }
      });

      if (otherTeacher && otherTeacher.idTeacher !== existingTeacher.idTeacher) {
        throw new ConflictException(`El numero de personal ya esta registrado.`);
      }

      const updatedTeacher = await this.prisma.teacher.update({
        where: { idTeacher: id },
        data: updateTeacherDto
      });

      return updatedTeacher;
  }

  async remove(id: string) {
    return this.prisma.teacher.delete({ where: { idTeacher: id } });
  }
}
