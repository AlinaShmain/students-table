import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentDto } from './student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {

    constructor(private readonly studentsService: StudentsService) {

    }

    @Post("add")
    create(@Body() newStudent: StudentDto): StudentDto {
        // const parsedData: StudentDto = JSON.parse(newStudent); 
        console.log("newStudent", newStudent);
        return this.studentsService.create(newStudent);
    }

    @Get()
    findAll(): Array<StudentDto> {
        console.log("get students");
        return this.studentsService.getAll()
    }

    @Put("edit")
    edit(@Body() studentToEdit: StudentDto): StudentDto {
        console.log("edit student", studentToEdit);
        return this.studentsService.edit(studentToEdit);
    }

    @Get("delete/:id")
    delete(@Param("id") id: string): {id: string} {
        console.log("delete id student", id);
        return this.studentsService.delete(id);
    }

}
