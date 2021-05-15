import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "./student";

@Injectable({
  providedIn: "root"
})
export abstract class StudentsService {
  // private geturl = '/students';
  protected students: Student[] = [];

  // constructor() {
    // protected store$: Store<AppState>) {
    // this.bufferStudentsSource = new Subject<Student[]>();
    // this.bufferStudents$ = this.bufferStudentsSource.asObservable();
  // }

  abstract getStudents(): Observable<Student[]>;

  abstract addStudent(student: Student): Observable<Student>;

  abstract editStudent(studentToEdit: Student): Observable<Student>;

  abstract deleteStudent(studentToDelete: Student): Observable<{id: string}>;

}

