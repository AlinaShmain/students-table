import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export abstract class StudentsService {
  private geturl = '/students';
  protected students: Student[] = [];
  protected bufferStudentsSource: Subject<Student[]>;
  private bufferStudents$: Observable<Student[]>;
  private studentToEdit: Student | undefined;

  constructor() {
    this.bufferStudentsSource = new Subject<Student[]>();
    this.bufferStudents$ = this.bufferStudentsSource.asObservable();
  }

  abstract getStudents(): Observable<Student[]>;

  abstract addStudent(student: Student): Observable<Student>;

  abstract editStudent(studentToEdit: Student): Observable<Student>;

  abstract deleteStudent(studentToDelete: Student): Observable<{id: string}>;

  getBufferStudents(): Observable<Student[]> {
    console.log("get buffer students");
    return this.bufferStudents$;
  }

  setBufferStudents(students: Student[]): void {
    console.log("set buffer students in service", students);
    this.bufferStudentsSource.next(students);
  }

  setStudentToEdit(student: Student): void {
    console.log("set student to edit in service", student);
    this.studentToEdit = student;
  }

  getStudentToEdit(): Student | undefined {
    return this.studentToEdit;
  }

}

