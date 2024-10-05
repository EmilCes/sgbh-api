import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassroomsService {

  constructor (
    private prisma: PrismaService
  ) {}

  async create(createClassroomDto: CreateClassroomDto) {

    const newClassroom = await this.prisma.classroom.create({ data: {
      ...createClassroomDto
    }});

    return newClassroom; 
  }

  async findAll() {
    return await this.prisma.classroom.findMany();
  }

  findOne(id: string) {
    const classroomFound = this.prisma.classroom.findUnique({ where: { idClassroom: id } });

    if (!classroomFound) 
      throw new NotFoundException(`Usuario con ${id} no encontrado`);

    return classroomFound;
  }

  update(id: string, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: string) {
    return this.prisma.classroom.delete({ where: { idClassroom: id } });
  }
}
