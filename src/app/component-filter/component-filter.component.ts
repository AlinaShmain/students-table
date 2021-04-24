import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-component-filter',
  templateUrl: './component-filter.component.html',
  styleUrls: ['./component-filter.component.css']
})

export class ComponentFilterComponent implements OnInit {

  days: Array<number> = Array.from({ length: 30 }, (v, k) => k + 1);
  months: { [key: string]: number } = { "January": 1, "February": 2, "Marth": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };
  monthsName: Array<string> = Object.keys(this.months);
  currentYear: number = new Date().getFullYear();
  years: Array<number> = Array(this.currentYear - (this.currentYear - 90)).fill(this.currentYear - 70).map((v, i) => v + i)
  isOpen: boolean = false;
  selectedFromDay: string = "From";
  selectedToDay: string = "To";
  selectedFromMonth: string = "From";
  selectedToMonth: string = "To";
  selectedFromYear: string = "From";
  selectedToYear: string = "To";
  selectedFromScore: string = "From";
  selectedToScore: string = "To";
  scores: Array<number> = Array.from({ length: 5 }, (v, k) => k + 1);

  _column: string | undefined;

  @Input() set column(value: string) {
    this._column = value;
  }

  get column(): string {
    return this._column || 'Unknown'
  }

  _rows: Array<{ [key: string]: string }> = [];

  @Input() set rows(value: Array<{ [key: string]: string }>) {
    this._rows = value;
  }

  get rows(): Array<{ [key: string]: string }> {
    return this._rows || 'Unknown'
  }

  @Output()
  emitSetRows: EventEmitter<Array<{ [key: string]: string }>> = new EventEmitter<Array<{ [key: string]: string }>>();

  constructor() { }

  ngOnInit(): void {
  }

  getDay(date: string): number {
    return Number(date.split(".")[0]);
  }

  getMonth(date: string): number {
    return Number(date.split(".")[1]);
  }

  getYear(date: string): number {
    let yearVal = date.split(".")[2];
    const yearNum = Number(yearVal);
    let fullYear;
    if (yearNum < 100) {
      fullYear = "19" + yearVal;
    }
    return Number(fullYear);
  }

  onFilterDate(): void {
    if (this.selectedFromDay !== "From" || this.selectedToDay !== "To") {
      const valFrom: number = Number(this.selectedFromDay);
      const valTo: number = Number(this.selectedToDay);

      if (this.selectedFromDay !== "From" && this.selectedToDay !== "To") {
        this.rows = this.rows.filter((row) => (this.getDay(row["Дата Рождения"]) >= valFrom) && (this.getDay(row["Дата Рождения"]) <= valTo));
      } else if (this.selectedFromDay !== "From") {
        this.rows = this.rows.filter((row) => (this.getDay(row["Дата Рождения"]) >= valFrom));
      } else {
        this.rows = this.rows.filter((row) => (this.getDay(row["Дата Рождения"]) <= valTo));
      }
    }
    if (this.selectedFromMonth !== "From" || this.selectedToMonth !== "To") {
      const valFrom: number = this.months[this.selectedFromMonth];
      const valTo: number = this.months[this.selectedToMonth];

      if (this.selectedFromMonth !== "From" && this.selectedToMonth !== "To") {
        this.rows = this.rows.filter((row) => (this.getMonth(row["Дата Рождения"]) >= valFrom) && (this.getMonth(row["Дата Рождения"]) <= valTo));
      } else if (this.selectedFromMonth !== "From") {
        this.rows = this.rows.filter((row) => (this.getMonth(row["Дата Рождения"]) >= valFrom));
      } else {
        this.rows = this.rows.filter((row) => (this.getMonth(row["Дата Рождения"]) <= valTo));
      }
    }
    if (this.selectedFromYear !== "From" || this.selectedToYear !== "To") {
      const valFrom: number = Number(this.selectedFromYear);
      const valTo: number = Number(this.selectedToYear);

      if (this.selectedFromYear !== "From" && this.selectedToYear !== "To") {
        this.rows = this.rows.filter((row) => (this.getYear(row["Дата Рождения"]) >= valFrom) && (this.getYear(row["Дата Рождения"]) <= valTo));
      } else if (this.selectedFromYear !== "From") {
        this.rows = this.rows.filter((row) => (this.getYear(row["Дата Рождения"]) >= valFrom));
      } else {
        this.rows = this.rows.filter((row) => (this.getYear(row["Дата Рождения"]) <= valTo));
      }
    }
    this.emitSetRows.emit(this.rows);
  }

  onFilterScore(): void {
    if (this.selectedFromScore !== "From" || this.selectedToScore !== "To") {
      const valFrom: number = Number(this.selectedFromScore);
      const valTo: number = Number(this.selectedToScore);

      if (this.selectedFromScore !== "From" && this.selectedToScore !== "To") {
        this.rows = this.rows.filter((row) => (Number(row["Средний Балл"]) >= valFrom) && (Number(row["Средний Балл"]) <= valTo));
      } else if (this.selectedFromScore !== "From") {
        this.rows = this.rows.filter((row) => (Number(row["Средний Балл"]) >= valFrom));
      } else {
        this.rows = this.rows.filter((row) => (Number(row["Средний Балл"]) <= valTo));
      }
    }
    this.emitSetRows.emit(this.rows);
  }
}
