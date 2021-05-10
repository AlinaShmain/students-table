import { Injectable } from '@nestjs/common';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentsService {

    private students: Array<StudentDto> = [
        {
            id: "0",
            lastName: "Иванов",
            firstName: "Иван",
            middleName: "Иванович",
            dateBirth: "01.01.1997",
            averageScore: "4"
        },
        {
            id: "1",
            lastName: "Петрова",
            firstName: "Мария",
            middleName: "Сергеевна",
            dateBirth: "03.06.1998",
            averageScore: "5"
        },
        {
            id: "2",
            lastName: "Крылов",
            firstName: "Александр",
            middleName: "Сергеевич",
            dateBirth: "20.06.1998",
            averageScore: "2"
        },
        {
            id: "3",
            lastName: "Есенина",
            firstName: "Мария",
            middleName: "Юрьевна",
            dateBirth: "07.03.1995",
            averageScore: "4"
        }
    ]

    constructor() {

    }

    create(student: StudentDto): StudentDto {
        this.students.push(student);
        return student;
    }

    getAll(): Array<StudentDto> {
        return this.students;
    }

    getIndex(id: string): number {
        return this.students.findIndex((student) => student.id === id);
    }

    edit(studentToEdit: StudentDto): StudentDto {
        const idx = this.getIndex(studentToEdit.id);
        // this.students.splice(this.students.findIndex((student) => student.id === studentToEdit.id), 1, studentToEdit);
        this.students.splice(idx, 1, studentToEdit);
        // console.log(this.students);
        return studentToEdit;
    }

    delete(id: string): {id: string} {
        const idx = this.getIndex(id);
        this.students.splice(idx, 1);
        console.log(this.students);
        return {id};
    }

}
