import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { StudentsService } from "src/app/services/students.service";
import { Student } from "./services/student";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  // // headers: Array<string> = ["Фамилия", "Имя", "Отчество", "Дата Рождения", "Средний Балл"];
  // headers: Student = {
  //   lastName: "Фамилия",
  //   firstName: "Имя",
  //   middleName: "Отчество",
  //   dateBirth: "Дата Рождения",
  //   averageScore: "Средний Балл"
  // };
  // // rows: Array<{ [key: string]: string }> = [
  // //   {
  // //     "Фамилия": "Иванов",
  // //     "Имя": "Иван",
  // //     "Отчество": "Иванович",
  // //     "Дата Рождения": "01.01.1997",
  // //     "Средний Балл": "4"
  // //   },
  // //   {
  // //     "Фамилия": "Петрова",
  // //     "Имя": "Мария",
  // //     "Отчество": "Сергеевна",
  // //     "Дата Рождения": "03.06.1998",
  // //     "Средний Балл": "5"
  // //   },
  // //   {
  // //     "Фамилия": "Крылов",
  // //     "Имя": "Александр",
  // //     "Отчество": "Сергеевич",
  // //     "Дата Рождения": "20.06.1998",
  // //     "Средний Балл": "2"
  // //   },
  // //   {
  // //     "Фамилия": "Есенина",
  // //     "Имя": "Мария",
  // //     "Отчество": "Юрьевна",
  // //     "Дата Рождения": "07.03.1995",
  // //     "Средний Балл": "4"
  // //   },
  // // ];
  // // students: Observable<Student[]> | undefined;
  // students: Student[] = [];
  // subscriptions: Subscription[] = [];
  // // curators: Array<{ [key: string]: string }> = [
  // //   {
  // //     "Фамилия": "Петров",
  // //     "Имя": "Сергей",
  // //     "Отчество": "Николаевич"
  // //   },
  // //   {
  // //     "Фамилия": "Бунин",
  // //     "Имя": "Алексей",
  // //     "Отчество": "Кириллович"
  // //   },
  // // ];
  // // bufferRows: Array<{ [key: string]: string }> = this.rows;
  // bufferStudents: Student[] = [];
  // // rows2: Array<{ [key: string]: string }> = this.rows;
  // // rows3: Array<{ [key: string]: string }> = this.rows;
  // // isShowLastName: boolean = false;
  // // isShowFirstName: boolean = false;
  // // isShowMiddleName: boolean = false;
  // // isShowDateBirth: boolean = false;
  // // isShowScore: boolean = false;
  // // openFlags: { [key: string]: boolean } = {
  // //   "Фамилия": this.isShowLastName,
  // //   "Имя": this.isShowFirstName,
  // //   "Отчество": this.isShowMiddleName,
  // //   "Дата Рождения": this.isShowDateBirth,
  // //   "Средний Бал": this.isShowScore
  // // };
  // // foundStudents: Array<{ [key: string]: string }> = [];
  // // isDown: boolean = true;
  // // isDownLastName: boolean = false;
  // // isDownFirstName: boolean = false;
  // // isDownMiddleName: boolean = false;
  // // isDownDateBirth: boolean = false;
  // // isDownScore: boolean = false;
  // // downFlags: { [key: string]: boolean } = {
  // //   "Фамилия": this.isDownLastName,
  // //   "Имя": this.isDownFirstName,
  // //   "Отчество": this.isDownMiddleName,
  // //   "Дата Рождения": this.isDownDateBirth,
  // //   "Средний Бал": this.isDownScore
  // // };

  // isHighlight: boolean = true;
  // // isEnable: boolean = false;
  // // isActivateCalculate: boolean = false;
  // // isGrouping: boolean = false;

  // // groupedRows: { [key: string]: Array<{ [key: string]: string }> } = {};
  // // draggableObjects: Array<{ data: { [key: string]: string }, zones: Array<{ [key: string]: string }> }> = new Array(this.rows.length);
  // // droppableObjects: Array<{ data: { [key: string]: string }, zone: string }> = new Array(this.curators.length);

  // constructor(private studentsService: StudentsService, private cdr: ChangeDetectorRef) {
  //   // for (let i = 0; i < this.droppableObjects.length; i++) {
  //   //   this.droppableObjects[i] = {
  //   //     data: this.curators[i],
  //   //     zone: "zone-" + i
  //   //   };
  //   // }

  //   // // const zones = this.droppableObjects.map((object) => object.zone);
  //   // // console.log(zones);
  //   // // console.log(this.droppableObjects);

  //   // // for (let i = 0; i < this.rows.length; i++) {
  //   // //   this.draggableObjects.push({
  //   // //     data: this.rows[i],
  //   // //     zones: zones
  //   // //   });
  //   // // }

  //   // // console.log(this.draggableObjects);
  // }

  // ngOnInit(): void {
  //   const subscription = this.studentsService.getStudents().subscribe((students: Student[]) => {
  //     console.log("jdj", students);
  //     this.students = students;
  //     this.cdr.markForCheck();
  //     this.bufferStudents = [...this.students];
  //   });

  //   // this.students = this.studentsService.getStudents();

  //   console.log("subsrciption");
  //   this.subscriptions.push(subscription);
  // }

  // ngOnDestroy(): void {
  //   this.subscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  //   this.subscriptions = [];
  // }

  // convertToNumber(val: string): number {
  //   return parseInt(val, 10);
  // }

  // // onOpenInput(e: MouseEvent, column: string): void {
  // //   this.openFlags[column] = !this.openFlags[column];
  // // }

  // // onKey(val: string, column: string): void {
  // //   this.foundStudents = [];
  // //   let value = val.toLowerCase();

  // //   if (value) {
  // //     value = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // //     const regexp = new RegExp(`^${value}`, "g");

  // //     if (this.bufferRows.length !== 0) {
  // //       this.bufferRows.forEach((row) => {
  // //         const columnLowerCase = row[column].toLowerCase().trim();
  // //         if (
  // //           columnLowerCase.match(regexp)
  // //         ) {
  // //           this.foundStudents.push(row);
  // //         }
  // //       });
  // //     }
  // //   }
  // // }

  // // onToggleDown(col: string): void {
  // //   if (this.downFlags[col]) {
  // //     this.downFlags[col] = false;

  // //     if (col === "Дата Рождения") {
  // //       this.descendingSortDate(col);
  // //     } else if (col === "Средний Балл") {
  // //       this.sortLargeToSmall(col);
  // //     } else {
  // //       this.sortBackward(col);
  // //     }
  // //   } else {
  // //     this.downFlags[col] = true;

  // //     if (col === "Дата Рождения") {
  // //       this.sortDate(col);
  // //     } else if (col === "Средний Балл") {
  // //       this.sortSmallToLarge(col);
  // //     } else {
  // //       this.sortAlphabetically(col);
  // //     }
  // //   }
  // // }

  // // onToggleScale(): void {
  // //   this.isEnable = !this.isEnable;
  // // }

  // // onCalculate(): void {
  // //   this.isActivateCalculate = !this.isActivateCalculate;
  // // }

  // // convertToDate(dateStr: string): Date {
  // //   const dateArr = dateStr.split(".");
  // //   const yearVal = dateArr[2];
  // //   dateStr = `${yearVal}-${dateArr[1]}-${dateArr[0]}T00:00:00Z`;
  // //   const date = new Date(dateStr);
  // //   return date;
  // // }

  // // sortDate(col: string): void {
  // //   const sortedRows: Array<{ [key: string]: string }> = this.bufferRows.sort((a: { [key: string]: string }, b: { [key: string]: string }) => this.convertToDate(a[col]).getTime() - this.convertToDate(b[col]).getTime());
  // //   this.bufferRows = sortedRows;
  // // }

  // // descendingSortDate(col: string): void {
  // //   const sortedRows: Array<{ [key: string]: string }> = this.bufferRows.sort((a: { [key: string]: string }, b: { [key: string]: string }) => this.convertToDate(b[col]).getTime() - this.convertToDate(a[col]).getTime());
  // //   this.bufferRows = sortedRows;
  // // }

  // // sortSmallToLarge(col: string): void {
  // //   const sortedRows: Array<{ [key: string]: string }> = this.bufferRows.sort((a: { [key: string]: string }, b: { [key: string]: string }) => this.convertToNumber(a[col]) - this.convertToNumber(b[col]));
  // //   this.bufferRows = sortedRows;
  // // }

  // // sortLargeToSmall(col: string): void {
  // //   const sortedRows: Array<{ [key: string]: string }> = this.bufferRows.sort((a: { [key: string]: string }, b: { [key: string]: string }) => this.convertToNumber(b[col]) - this.convertToNumber(a[col]));
  // //   this.bufferRows = sortedRows;
  // // }

  // // sortAlphabetically(col: string): void {
  // //   const sortedRows: Array<{ [key: string]: string }> = this.bufferRows.sort((a: { [key: string]: string }, b: { [key: string]: string }) =>
  // //     a[col].localeCompare(b[col]),
  // //   );
  // //   this.bufferRows = sortedRows;
  // // }

  // // sortBackward(col: string): void {
  // //   const sortedRows: Array<{ [key: string]: string }> = this.bufferRows.sort((a: { [key: string]: string }, b: { [key: string]: string }) =>
  // //     b[col].localeCompare(a[col]),
  // //   );
  // //   this.bufferRows = sortedRows;
  // // }

  // // setRows(newRows: Array<{ [key: string]: string }>): void {
  // //   this.bufferRows = newRows;
  // // }

  // // setRows2(filteredRows: Array<{ [key: string]: string }>): void {
  // //   this.rows2 = filteredRows;
  // // }

  // // setRows3(filteredRows: Array<{ [key: string]: string }>): void {
  // //   this.rows3 = filteredRows;
  // // }

  // onHighlight(): void {
  //   this.isHighlight = !this.isHighlight;
  // }

  // // delete(rowToDelete: { [key: string]: string }): void {
  // //   this.bufferRows = this.bufferRows.filter((row) => row !== rowToDelete);
  // // }

  // // edit(data: { currentRow: { [key: string]: string } | undefined, editedRow: { [key: string]: string } | undefined }): void {
  // //   if (data.editedRow !== undefined) {
  // //     this.bufferRows.splice(this.bufferRows.findIndex((row) => (row) === data.currentRow), 1, data.editedRow);
  // //   }
  // // }

  // // add(row: { [key: string]: string }): void {
  // //   this.bufferRows.push(row);
  // // }

  // addNewStudent(student: Student): void {
  //   console.log("app component", student);
  //   const subscription = this.studentsService.addStudent(student).subscribe((student: Student) => {
  //     console.log("after post", student);
  //     this.students.push(student);
  //     this.bufferStudents.push(student);
  //     this.cdr.markForCheck();
  //   });

  //   console.log("subsrciption");
  //   this.subscriptions.push(subscription);
  // }

  // // onGroup(): void {
  // //   this.isGrouping = !this.isGrouping;
  // // }

  // // onZoneDrop(acceptedData: { data: { [key: string]: string }, zone: string }): void {
  // //   const zone: string = acceptedData.zone;

  // //   const students: Array<{ [key: string]: string }> = this.groupedRows[zone];

  // //   this.groupedRows[zone] = students ? [...students, acceptedData.data] : [acceptedData.data];
  // // }
}
