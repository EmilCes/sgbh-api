import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {

  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomsService.create(createClassroomDto);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('searchTerm') searchTerm?: string
  ) {

    const limitNumber = Math.max(1, Number(limit));
    const pageNumber = Math.max(1, Number(page));

    const { classrooms, total } = await this.classroomsService.findAll(pageNumber, limitNumber, searchTerm);
    const lastPage = Math.ceil(total / limitNumber);

    return { classrooms, total, lastPage };

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomsService.remove(id);
  }
}
