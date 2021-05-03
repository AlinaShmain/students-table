import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

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

  _rows: Array<{ [key: string]: string }> = [];

  @Input() set rows(value: Array<{ [key: string]: string }>) {
    this._rows = value;
  }

  get rows(): Array<{ [key: string]: string }> {
    return this._rows || "Unknown";
  }

  _rows2: Array<{ [key: string]: string }> = [];

  @Input() set rows2(value: Array<{ [key: string]: string }>) {
    this._rows2 = value;
  }

  get rows2(): Array<{ [key: string]: string }> {
    return this._rows2 || "Unknown";
  }

  _rows3: Array<{ [key: string]: string }> = [];

  @Input() set rows3(value: Array<{ [key: string]: string }>) {
    this._rows3 = value;
  }

  get rows3(): Array<{ [key: string]: string }> {
    return this._rows3 || "Unknown";
  }

  @Output()
  emitSetRows: EventEmitter<Array<{ [key: string]: string }>> = new EventEmitter<Array<{ [key: string]: string }>>();
  @Output()
  emitSetRows2: EventEmitter<Array<{ [key: string]: string }>> = new EventEmitter<Array<{ [key: string]: string }>>();
  @Output()
  emitSetRows3: EventEmitter<Array<{ [key: string]: string }>> = new EventEmitter<Array<{ [key: string]: string }>>();

  ngOnInit(): void {
  }

  getDay(date: string): number {
    return Number(date.split(".")[0]);
  }

  getMonth(date: string): number {
    return Number(date.split(".")[1]);
  }

  getYear(date: string): number {
    // const yearVal = date.split(".")[2];
    // const yearNum = Number(yearVal);
    // const fullYear = (yearNum < 100) ? "19" + yearVal : "20" + yearVal;
    return Number(date.split(".")[2]);
  }

  onFilterDate(): void {
    let filteredRows = this.rows2;

    if (this.selectedFromDay !== "From" || this.selectedToDay !== "To") {
      const valFrom: number = Number(this.selectedFromDay);
      const valTo: number = Number(this.selectedToDay);

      if (this.selectedFromDay !== "From" && this.selectedToDay !== "To") {
        filteredRows = filteredRows.filter((row) => (this.getDay(row["Дата Рождения"]) >= valFrom) && (this.getDay(row["Дата Рождения"]) <= valTo));
      } else if (this.selectedFromDay !== "From") {
        filteredRows = filteredRows.filter((row) => (this.getDay(row["Дата Рождения"]) >= valFrom));
      } else {
        filteredRows = filteredRows.filter((row) => (this.getDay(row["Дата Рождения"]) <= valTo));
      }
    }
    if (this.selectedFromMonth !== "From" || this.selectedToMonth !== "To") {
      const valFrom: number = this.months[this.selectedFromMonth];
      const valTo: number = this.months[this.selectedToMonth];

      if (this.selectedFromMonth !== "From" && this.selectedToMonth !== "To") {
        filteredRows = filteredRows.filter((row) => (this.getMonth(row["Дата Рождения"]) >= valFrom) && (this.getMonth(row["Дата Рождения"]) <= valTo));
      } else if (this.selectedFromMonth !== "From") {
        filteredRows = filteredRows.filter((row) => (this.getMonth(row["Дата Рождения"]) >= valFrom));
      } else {
        filteredRows = filteredRows.filter((row) => (this.getMonth(row["Дата Рождения"]) <= valTo));
      }
    }
    if (this.selectedFromYear !== "From" || this.selectedToYear !== "To") {
      const valFrom: number = Number(this.selectedFromYear);
      const valTo: number = Number(this.selectedToYear);

      if (this.selectedFromYear !== "From" && this.selectedToYear !== "To") {
        filteredRows = filteredRows.filter((row) => (this.getYear(row["Дата Рождения"]) >= valFrom) && (this.getYear(row["Дата Рождения"]) <= valTo));
      } else if (this.selectedFromYear !== "From") {
        filteredRows = filteredRows.filter((row) => (this.getYear(row["Дата Рождения"]) >= valFrom));
      } else {
        filteredRows = filteredRows.filter((row) => (this.getYear(row["Дата Рождения"]) <= valTo));
      }
    }
    if (this.selectedFromScore !== "From" || this.selectedToScore !== "To") {
      this.emitSetRows3.emit(this.rows2);
      console.log(this.rows3);
    }
    this.emitSetRows2.emit(filteredRows);
    this.emitSetRows.emit(filteredRows);
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
    this.emitSetRows2.emit(this.rows);
    this.emitSetRows.emit(this.rows3);
  }

  onFilterScore(): void {
    let filteredRows = this.rows2;

    if (this.selectedFromScore !== "From" || this.selectedToScore !== "To") {
      const valFrom: number = Number(this.selectedFromScore);
      const valTo: number = Number(this.selectedToScore);

      if (this.selectedFromScore !== "From" && this.selectedToScore !== "To") {
        filteredRows = filteredRows.filter((row) => (Number(row["Средний Балл"]) >= valFrom) && (Number(row["Средний Балл"]) <= valTo));
      } else if (this.selectedFromScore !== "From") {
        filteredRows = filteredRows.filter((row) => (Number(row["Средний Балл"]) >= valFrom));
      } else {
        filteredRows = filteredRows.filter((row) => (Number(row["Средний Балл"]) <= valTo));
      }
    }
    if (this.selectedFromDay !== "From" || this.selectedToDay !== "To" || this.selectedFromMonth !== "From" || this.selectedToMonth !== "To" || this.selectedFromYear !== "From" || this.selectedToYear !== "To") {
      // console.log(this.rows2);
      // this.rows3 = this.rows2;
      this.emitSetRows3.emit(this.rows2);
    }
    this.emitSetRows2.emit(filteredRows);
    this.emitSetRows.emit(filteredRows);
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
