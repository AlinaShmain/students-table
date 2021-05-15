import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { Student } from "./student";
import { StudentsService } from "./students.service";

@Injectable({
  providedIn: "root"
})
export class StudentsLocalService extends StudentsService {
  // private _headers: Array<string> = ["Фамилия", "Имя", "Отчество", "Дата Рождения", "Средний Балл"];
  private _students: Student[] = [
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
    },
  ];

  // constructor(store$: Store<AppState>) {
  //   super(store$);
  // }

  getStudents(): Observable<Student[]> {
    console.log("get students from local service");

    return new Observable((subscriber: Subscriber<Student[]>) => {
      console.log("Subscriber Subscribed to get");
      subscriber.next(this._students);
    });
  }

  addStudent(student: Student): Observable<Student> {
    this._students.push(student);
    this.students = [...this._students];

    return new Observable((subscriber: Subscriber<Student>) => {
      console.log("Subscriber Subscribed to add");
      subscriber.next(student);
    });
  }

  editStudent(studentToEdit: Student): Observable<Student> {
    this._students.splice(this._students.findIndex((student) => student.id === studentToEdit.id), 1, studentToEdit);
    this.students = [...this._students];

    return new Observable((subscriber: Subscriber<Student>) => {
      console.log("Subscriber Subscribed to edit");
      subscriber.next(studentToEdit);
    });
  }

  deleteStudent(studentToDelete: Student): Observable<{ id: string }> {
    this._students.splice(this._students.findIndex((student) => student.id === studentToDelete.id), 1);
    this.students = [...this._students];

    return new Observable((subscriber: Subscriber<{ id: string }>) => {
      console.log("Subscriber Subscribed to delete");
      subscriber.next({ id: studentToDelete.id });
    });
  }

}
