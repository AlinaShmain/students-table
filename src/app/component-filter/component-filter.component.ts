import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Student } from "../services/student";

@Component({
  selector: "app-component-filter",
  templateUrl: "./component-filter.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./component-filter.component.css"]
})

export class ComponentFilterComponent implements OnInit {

  days: Array<number> = Array.from({ length: 30 }, (v, k) => k + 1);
  months: { [key: string]: number } = { "January": 1, "February": 2, "Marth": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };
  monthsName: Array<string> = Object.keys(this.months);
  currentYear: number = new Date().getFullYear();
  years: Array<number> = Array(this.currentYear - (this.currentYear - 90)).fill(this.currentYear - 70).map((v, i) => v + i);
  isOpen: boolean = false;
  dayFromContext: string | null = localStorage.getItem("selectedFromDay");
  selectedFromDay: string = this.dayFromContext ? this.dayFromContext : "From";
  dayToContext: string | null = localStorage.getItem("selectedToDay");
  selectedToDay: string = this.dayToContext ? this.dayToContext : "To";
  monthFromContext: string | null = localStorage.getItem("selectedFromMonth");
  selectedFromMonth: string = this.monthFromContext ? this.monthFromContext : "From";
  monthToContext: string | null = localStorage.getItem("selectedToMonth");
  selectedToMonth: string = this.monthToContext ? this.monthToContext : "To";
  yearFromContext: string | null = localStorage.getItem("selectedFromYear");
  selectedFromYear: string = this.yearFromContext ? this.yearFromContext : "From";
  yearToContext: string | null = localStorage.getItem("selectedToYear");
  selectedToYear: string = this.yearToContext ? this.yearToContext : "To";
  scoreFromContext: string | null = localStorage.getItem("selectedFromScore");
  selectedFromScore: string = this.scoreFromContext ? this.scoreFromContext : "From";
  scoreToContext: string | null = localStorage.getItem("selectedToScore");
  selectedToScore: string = this.scoreToContext ? this.scoreToContext : "To";
  scores: Array<number> = Array.from({ length: 5 }, (v, k) => k + 1);

  _column: string | undefined;

  @Input() set column(value: string) {
    this._column = value;
  }

  get column(): string {
    return this._column || "Unknown";
  }

  private _students: Student[] | null = [];

  @Input() set students(value: Student[] | null) {
    console.log(value);
    this._students = value;
  }

  get students(): Student[] | null {
    return this._students;
  }

  private _students2: Student[] | null = [];

  @Input() set students2(value: Student[] | null) {
    this._students2 = value;
  }

  get students2(): Student[] | null {
    return this._students2;
  }

  private _students3: Student[] | null = [];

  @Input() set students3(value: Student[] | null) {
    this._students3 = value;
  }

  get students3(): Student[] | null {
    return this._students3;
  }

  @Output()
  emitSetStudents: EventEmitter<Student[]> = new EventEmitter<Student[]>();
  @Output()
  emitSetStudents2: EventEmitter<Student[]> = new EventEmitter<Student[]>();
  @Output()
  emitSetStudents3: EventEmitter<Student[]> = new EventEmitter<Student[]>();

  ngOnInit(): void {

  }

  getDay(date: string): number {
    return Number(date.split(".")[0]);
  }

  getMonth(date: string): number {
    return Number(date.split(".")[1]);
  }

  getYear(date: string): number {
    return Number(date.split(".")[2]);
  }

  onFilterDate(): void {
    if (!this.students2) { return; }

    let filteredStudents = [...this.students2];

    if (this.selectedFromDay !== "From" || this.selectedToDay !== "To") {
      const valFrom: number = Number(this.selectedFromDay);
      const valTo: number = Number(this.selectedToDay);

      if (this.selectedFromDay !== "From" && this.selectedToDay !== "To") {
        filteredStudents = filteredStudents.filter((student) => (this.getDay(student.dateBirth) >= valFrom) && (this.getDay(student.dateBirth) <= valTo));
      } else if (this.selectedFromDay !== "From") {
        filteredStudents = filteredStudents.filter((student) => (this.getDay(student.dateBirth) >= valFrom));
      } else {
        filteredStudents = filteredStudents.filter((student) => (this.getDay(student.dateBirth) <= valTo));
      }
    }
    if (this.selectedFromMonth !== "From" || this.selectedToMonth !== "To") {
      const valFrom: number = this.months[this.selectedFromMonth];
      const valTo: number = this.months[this.selectedToMonth];

      if (this.selectedFromMonth !== "From" && this.selectedToMonth !== "To") {
        filteredStudents = filteredStudents.filter((student) => (this.getMonth(student.dateBirth) >= valFrom) && (this.getMonth(student.dateBirth) <= valTo));
      } else if (this.selectedFromMonth !== "From") {
        filteredStudents = filteredStudents.filter((student) => (this.getMonth(student.dateBirth) >= valFrom));
      } else {
        filteredStudents = filteredStudents.filter((student) => (this.getMonth(student.dateBirth) <= valTo));
      }
    }
    if (this.selectedFromYear !== "From" || this.selectedToYear !== "To") {
      const valFrom: number = Number(this.selectedFromYear);
      const valTo: number = Number(this.selectedToYear);

      if (this.selectedFromYear !== "From" && this.selectedToYear !== "To") {
        filteredStudents = filteredStudents.filter((student) => (this.getYear(student.dateBirth) >= valFrom) && (this.getYear(student.dateBirth) <= valTo));
      } else if (this.selectedFromYear !== "From") {
        filteredStudents = filteredStudents.filter((student) => (this.getYear(student.dateBirth) >= valFrom));
      } else {
        filteredStudents = filteredStudents.filter((student) => (this.getYear(student.dateBirth) <= valTo));
      }
    }
    if (this.selectedFromScore !== "From" || this.selectedToScore !== "To") {
      this.emitSetStudents3.emit(this.students2);
      console.log(this.students3);
    }
    this.emitSetStudents2.emit(filteredStudents);
    this.emitSetStudents.emit(filteredStudents);
  }

  onResetFilter(): void {
    if (this.selectedFromDay !== "From") {
      this.selectedFromDay = "From";
      localStorage.removeItem("selectedFromDay");
    }
    if (this.selectedToDay !== "To") {
      this.selectedToDay = "To";
      localStorage.removeItem("selectedToDay");
    }
    if (this.selectedFromMonth !== "From") {
      this.selectedFromMonth = "From";
      localStorage.removeItem("selectedFromMonth");
    }
    if (this.selectedToMonth !== "To") {
      this.selectedToMonth = "To";
      localStorage.removeItem("selectedToMonth");
    }
    if (this.selectedFromYear !== "From") {
      this.selectedFromYear = "From";
      localStorage.removeItem("selectedFromYear");
    }
    if (this.selectedToYear !== "To") {
      this.selectedToYear = "To";
      localStorage.removeItem("selectedToYear");
    }
    if (this.selectedFromScore !== "From") {
      this.selectedFromScore = "From";
      localStorage.removeItem("selectedFromScore");
    }
    if (this.selectedToScore !== "To") {
      this.selectedToScore = "To";
      localStorage.removeItem("selectedToScore");
    }
    // localStorage.clear();
    this.students && this.emitSetStudents2.emit(this.students);
    this.students3 && this.emitSetStudents.emit(this.students3);
  }

  onFilterScore(): void {
    if (!this.students2) { return; }

    let filteredStudents = this.students2;
    console.log(filteredStudents);

    if (this.selectedFromScore !== "From" || this.selectedToScore !== "To") {
      const valFrom: number = Number(this.selectedFromScore);
      const valTo: number = Number(this.selectedToScore);

      if (this.selectedFromScore !== "From" && this.selectedToScore !== "To") {
        filteredStudents = filteredStudents.filter((student) => (Number(student.averageScore) >= valFrom) && (Number(student.averageScore) <= valTo));
      } else if (this.selectedFromScore !== "From") {
        filteredStudents = filteredStudents.filter((student) => (Number(student.averageScore) >= valFrom));
      } else {
        filteredStudents = filteredStudents.filter((student) => (Number(student.averageScore) <= valTo));
      }
    }
    if (this.selectedFromDay !== "From" || this.selectedToDay !== "To" || this.selectedFromMonth !== "From" || this.selectedToMonth !== "To" || this.selectedFromYear !== "From" || this.selectedToYear !== "To") {
      this.emitSetStudents3.emit(this.students2);
    }
    this.emitSetStudents2.emit(filteredStudents);
    this.emitSetStudents.emit(filteredStudents);
  }

  saveDateContext(): void {
    if (this.selectedFromDay !== "From" && localStorage.getItem("selectedFromDay") !== this.selectedFromDay) {
      localStorage.setItem("selectedFromDay", this.selectedFromDay);
    }
    if (this.selectedToDay !== "To" && localStorage.getItem("selectedToDay") !== this.selectedToDay) {
      localStorage.setItem("selectedToDay", this.selectedToDay);
    }
    if (this.selectedFromMonth !== "From" && localStorage.getItem("selectedFromMonth") !== this.selectedFromMonth) {
      localStorage.setItem("selectedFromMonth", this.selectedFromMonth);
    }
    if (this.selectedToMonth !== "To" && localStorage.getItem("selectedToMonth") !== this.selectedToMonth) {
      localStorage.setItem("selectedToMonth", this.selectedToMonth);
    }
    if (this.selectedFromYear !== "From" && localStorage.getItem("selectedFromYear") !== this.selectedFromYear) {
      localStorage.setItem("selectedFromYear", this.selectedFromYear);
    }
    if (this.selectedToYear !== "To" && localStorage.getItem("selectedToYear") !== this.selectedToYear) {
      localStorage.setItem("selectedToYear", this.selectedToYear);
    }
  }

  saveScoreContext(): void {
    if (this.selectedFromScore !== "From" && localStorage.getItem("selectedFromScore") !== this.selectedFromScore) {
      localStorage.setItem("selectedFromScore", this.selectedFromScore);
    }
    if (this.selectedToScore !== "To" && localStorage.getItem("selectedToScore") !== this.selectedToScore) {
      localStorage.setItem("selectedToScore", this.selectedToScore);
    }
  }
}
