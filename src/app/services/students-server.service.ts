import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { StudentsService } from './students.service';
import { Student } from "./student";

@Injectable({
  providedIn: 'root'
})
export class StudentsServerService extends StudentsService {

  constructor(private http: HttpClient) {
    super();
  }

  getStudents(): Observable<Student[]> {

    console.log("get students from server");

    return this.http.get<Student[]>("http://localhost:3000/students")
      .pipe(
        tap(
          (students) => {
            this.students = [...students];
            this.setBufferStudents(this.students);
          }
          // error => console.error(error)
        ));
  }

  addStudent(student: Student): Observable<Student> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json' as const,
      },
    };
    console.log("post", student);
    return this.http.post<Student>("http://localhost:3000/students/add", JSON.stringify(student), httpOptions)
      .pipe(
        tap(
          (student) => {
            this.students = [...this.students, student];
            this.setBufferStudents(this.students);
            //     error => console.error(error)
          }
        )
      );
  }

  editStudent(studentToEdit: Student): Observable<Student> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json' as const,
      },
    };
    console.log("put add", studentToEdit);
    return this.http.put<Student>("http://localhost:3000/students/edit", JSON.stringify(studentToEdit), httpOptions)
      .pipe(
        tap(
          (editedStudent) => {
            this.students.splice(this.students.findIndex((student) => student.id === editedStudent.id), 1, editedStudent);
            this.setBufferStudents(this.students);
          }
          // error => console.error(error)
        )
      );
  }

  deleteStudent(studentToDelete: Student): Observable<{id: string}> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json' as const,
      },
    };
    console.log("put delete", studentToDelete);
    const id: string = studentToDelete.id;
    return this.http.get<{id: string}>(`http://localhost:3000/students/delete/${id}`, httpOptions)
      .pipe(
        tap(
          (deletedStudentIdObj) => {
            // console.log(typeof deletedStudentIdObj.id);
            const idx = this.students.findIndex((student) => student.id === deletedStudentIdObj.id);
            console.log("idx of found student to delete", idx);
            this.students.splice(idx, 1);
            console.log(this.students);
            this.setBufferStudents(this.students);
          }
          //     error => console.error(error)
        )
      );
  }

}

