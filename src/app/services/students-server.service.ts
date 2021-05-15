import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "./student";
import { StudentsService } from "./students.service";

@Injectable({
  providedIn: "root"
})
export class StudentsServerService extends StudentsService {

  constructor(private http: HttpClient) {
    super();
    // , store$: Store<AppState>) {
    // super(store$);
  }

  getStudents(): Observable<Student[]> {

    console.log("get students from server");

    return this.http.get<Student[]>("http://localhost:3000/students");
  }

  addStudent(student: Student): Observable<Student> {
    const httpOptions = {
      headers: {
        "Content-Type": "application/json" as const,
      },
    };
    console.log("post", student);
    return this.http.post<Student>("http://localhost:3000/students/add", JSON.stringify(student), httpOptions);
  }

  editStudent(studentToEdit: Student): Observable<Student> {
    const httpOptions = {
      headers: {
        "Content-Type": "application/json" as const,
      },
    };
    console.log("put add", studentToEdit);
    return this.http.put<Student>("http://localhost:3000/students/edit", JSON.stringify(studentToEdit), httpOptions);
  }

  deleteStudent(studentToDelete: Student): Observable<{ id: string }> {
    const httpOptions = {
      headers: {
        "Content-Type": "application/json" as const,
      },
    };
    console.log("put delete", studentToDelete);
    const id: string = studentToDelete.id;
    return this.http.get<{ id: string }>(`http://localhost:3000/students/delete/${id}`, httpOptions);
  }

}

