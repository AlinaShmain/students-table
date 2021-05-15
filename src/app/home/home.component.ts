import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StudentsPageActions } from "src/app/store/actions";
import { Student } from "../services/student";
import { AppState, selectBufferStudents, selectStudents } from "../store/state/app.state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit, OnDestroy {
  headers: Student = {
    id: "№",
    lastName: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    dateBirth: "Дата Рождения",
    averageScore: "Средний Балл"
  };
  students$: Observable<Student[]> = this.store.select(selectStudents);
  curators: Array<{ [key: string]: string }> = [
    {
      "Фамилия": "Петров",
      "Имя": "Сергей",
      "Отчество": "Николаевич"
    },
    {
      "Фамилия": "Бунин",
      "Имя": "Алексей",
      "Отчество": "Кириллович"
    },
  ];
  bufferStudents: Student[] = [];
  students2: Student[] | null = [];
  students3: Student[] | null = [];
  isShowLastName: boolean = false;
  isShowFirstName: boolean = false;
  isShowMiddleName: boolean = false;
  isShowDateBirth: boolean = false;
  isShowScore: boolean = false;
  openFlags: { [key: string]: boolean } = {
    "Фамилия": this.isShowLastName,
    "Имя": this.isShowFirstName,
    "Отчество": this.isShowMiddleName,
    "Дата Рождения": this.isShowDateBirth,
    "Средний Бал": this.isShowScore
  };
  foundStudents: Student[] = [];
  isDownLastName: boolean = false;
  isDownFirstName: boolean = false;
  isDownMiddleName: boolean = false;
  isDownDateBirth: boolean = false;
  isDownScore: boolean = false;
  downFlags: { [key: string]: boolean } = {
    "Фамилия": this.isDownLastName,
    "Имя": this.isDownFirstName,
    "Отчество": this.isDownMiddleName,
    "Дата Рождения": this.isDownDateBirth,
    "Средний Бал": this.isDownScore
  };

  isHighlight: boolean = true;
  isEnable: boolean = false;
  isActivateCalculate: boolean = false;
  isGrouping: boolean = false;

  groupedRows: { [key: string]: Student[] } = {};
  // draggableObjects: Array<{ data: { [key: string]: string }, zones: Array<{ [key: string]: string }> }> = new Array(this.rows.length);
  droppableObjects: { data: { [key: string]: string }, zone: string }[] = new Array(this.curators.length);

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private store: Store<AppState>) {
    for (let i = 0; i < this.droppableObjects.length; i++) {
      this.droppableObjects[i] = {
        data: this.curators[i],
        zone: "zone-" + i
      };
    }

    // const zones = this.droppableObjects.map((object) => object.zone);
    // console.log(zones);
    // console.log(this.droppableObjects);

    // for (let i = 0; i < this.rows.length; i++) {
    //   this.draggableObjects.push({
    //     data: this.rows[i],
    //     zones: zones
    //   });
    // }

    // console.log(this.draggableObjects);
  }

  ngOnInit(): void {
    this.store.dispatch(StudentsPageActions.loadStudents());

    this.store.select(selectBufferStudents).pipe(
      takeUntil(this.destroy$),
    ).subscribe((bufferStudents) => {
      this.bufferStudents = [...bufferStudents];
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.log("unsubscribe in home component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  convertToNumber(val: string): number {
    return parseInt(val, 10);
  }

  onEdit(e: Event, student: Student): void {
    console.log("on edit", student);
    this.store.dispatch(StudentsPageActions.selectStudent({ student }));
  }

  onDelete(e: Event, student: Student): void {
    console.log("on delete", student);
    this.store.dispatch(StudentsPageActions.selectStudent({ student }));
  }

  onOpenInput(e: MouseEvent, column: string): void {
    this.openFlags[column] = !this.openFlags[column];
  }

  onKey(val: string, column: string): void {
    this.foundStudents = [];
    let value = val.toLowerCase();

    const keys = Object.keys(this.headers) as Array<keyof Student>;
    const key: keyof Student | undefined = keys.find((k) => this.headers[k] === column);

    if (!key) { return; }

    if (value) {
      value = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const regexp = new RegExp(`^${value}`, "g");

      if (this.bufferStudents.length !== 0) {
        this.bufferStudents.forEach((student) => {
          const columnLowerCase = student[key].toLowerCase().trim();
          if (
            columnLowerCase.match(regexp)
          ) {
            this.foundStudents.push(student);
          }
        });
      }
    }
  }

  onToggleDown(col: string): void {
    const keys = Object.keys(this.headers) as Array<keyof Student>;
    const key: keyof Student | undefined = keys.find((k) => this.headers[k] === col);

    if (!key) { return; }

    if (this.downFlags[col]) {
      this.downFlags[col] = false;

      if (col === "Дата Рождения") {
        this.descendingSortDate(key);
      } else if (col === "Средний Балл") {
        this.sortLargeToSmall(key);
      } else {
        this.sortBackward(key);
      }
    } else {
      this.downFlags[col] = true;
      Object.keys(this.downFlags).forEach((k) => { if (k !== col) { this.downFlags[k] = false; } });

      if (col === "Дата Рождения") {
        this.sortDate(key);
      } else if (col === "Средний Балл") {
        this.sortSmallToLarge(key);
      } else {
        this.sortAlphabetically(key);
      }
    }
  }

  onToggleScale(): void {
    this.isEnable = !this.isEnable;
  }

  onCalculate(): void {
    this.isActivateCalculate = !this.isActivateCalculate;
  }

  convertToDate(dateStr: string): Date {
    const dateArr = dateStr.split(".");
    const yearVal = dateArr[2];
    dateStr = `${yearVal}-${dateArr[1]}-${dateArr[0]}T00:00:00Z`;
    const date = new Date(dateStr);
    return date;
  }

  sortDate(key: keyof Student): void {
    const sortedStudents: Student[] = this.bufferStudents.sort((a: Student, b: Student) =>
      this.convertToDate(a[key]).getTime() - this.convertToDate(b[key]).getTime(),
    );
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: sortedStudents }));
  }

  descendingSortDate(key: keyof Student): void {
    const sortedStudents: Student[] = this.bufferStudents.sort((a: Student, b: Student) =>
      this.convertToDate(b[key]).getTime() - this.convertToDate(a[key]).getTime(),
    );
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: sortedStudents }));
  }

  sortSmallToLarge(key: keyof Student): void {
    const sortedStudents: Student[] = this.bufferStudents.sort((a: Student, b: Student) =>
      this.convertToNumber(a[key]) - this.convertToNumber(b[key]),
    );
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: sortedStudents }));
  }

  sortLargeToSmall(key: keyof Student): void {
    const sortedStudents: Student[] = this.bufferStudents.sort((a: Student, b: Student) =>
      this.convertToNumber(b[key]) - this.convertToNumber(a[key]),
    );
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: sortedStudents }));
  }

  sortAlphabetically(key: keyof Student): void {
    const sortedStudents: Student[] = this.bufferStudents.sort((a: Student, b: Student) =>
      a[key].localeCompare(b[key]),
    );
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: sortedStudents }));
  }

  sortBackward(key: keyof Student): void {
    const sortedStudents: Student[] = this.bufferStudents.sort((a: Student, b: Student) =>
      b[key].localeCompare(a[key]),
    );
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: sortedStudents }));
  }

  setStudents(filteredStudents: Student[]): void {
    console.log(filteredStudents);
    this.store.dispatch(StudentsPageActions.setStudentsBuffer({ bufferStudents: filteredStudents }));
  }

  setStudents2(filteredRows: Student[]): void {
    this.students2 = filteredRows;
  }

  setStudents3(filteredRows: Student[]): void {
    this.students3 = filteredRows;
  }

  onHighlight(): void {
    this.isHighlight = !this.isHighlight;
    this.cdr.markForCheck();
  }

  onGroup(): void {
    this.isGrouping = !this.isGrouping;
  }

  onZoneDrop(acceptedData: { data: Student, zone: string }): void {
    const zone: string = acceptedData.zone;

    const students: Student[] = this.groupedRows[zone];

    this.groupedRows[zone] = students ? [...students, acceptedData.data] : [acceptedData.data];
  }
}
