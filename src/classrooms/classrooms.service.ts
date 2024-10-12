import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassroomsService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createClassroomDto: CreateClassroomDto) {

    const newClassroom = await this.prisma.classroom.create({
      data: {
        ...createClassroomDto
      }
    });

    return newClassroom;
  }

  async findAll(page: number, limit: number, searchTerm?: string) {

    const where = searchTerm
      ? {
        OR: [
          { name: { startsWith: searchTerm } }
        ]
      }
      : {};

    const total = await this.prisma.classroom.count({
      where
    });

    const classrooms = await this.prisma.classroom.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit
    });

    return { classrooms, total };

  }

  async findOne(id: string) {
    const classroomFound = this.prisma.classroom.findUnique({ where: { idClassroom: id } });

    if (!classroomFound)
      throw new NotFoundException(`Usuario con ${id} no encontrado`);

    return classroomFound;
  }

  async update(id: string, updateClassroomDto: UpdateClassroomDto) {
    const existingClassroom = await this.prisma.classroom.findUnique({
      where: {
        idClassroom: id
      }
    });

    if (!existingClassroom) {
      throw new NotFoundException(`Aula no encontrada.`)
    }

    const updatedClassroom = await this.prisma.classroom.update({
      where: { idClassroom: id },
      data: updateClassroomDto
    });

    return updatedClassroom;
  }

  async remove(id: string) {
    return this.prisma.classroom.delete({ where: { idClassroom: id } });
  }
}
