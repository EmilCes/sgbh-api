import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.prisma.user.findUnique({
      where: {
        institutionalEmail: createUserDto.institutionalEmail
      }
    });

    if (existingUser) {
      throw new ConflictException(`El usuario con este correo institucional ya esta registrado.`);
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto
      }
    });

    return newUser;
  }

  async findAll(page: number, limit: number, searchTerm?: string) {
    const where = searchTerm
      ? {
        OR: [
          { name: { startsWith: searchTerm } }
        ]
      }
      : {};

    const total = await this.prisma.user.count({
      where
    });

    const users = await this.prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit
    });

    return { users, total };
  }

  findOne(id: number) {
    const userFound = this.prisma.user.findUnique({ where: { idUser: id } });

    if (!userFound)
      throw new NotFoundException(`Usuario con ${id} no encontrado`);

    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const existingUser = await this.prisma.user.findUnique({
      where: {
        idUser: id
      }
    });

    if (!existingUser) {
      throw new NotFoundException(`Usuario no encontrado.`)
    }

    const otherUser = await this.prisma.user.findUnique({
      where: {
        institutionalEmail: updateUserDto.institutionalEmail
      }
    });

    if (otherUser && otherUser.idUser !== existingUser.idUser) {
      throw new ConflictException(`El usuario con correo institucional ${updateUserDto.institutionalEmail} ya esta registrado.`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { idUser: id },
      data: updateUserDto
    });

    return updatedUser;

  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { idUser: id } });
  }
}
