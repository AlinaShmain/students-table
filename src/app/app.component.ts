import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  headers: Array<string> = ["Фамилия", "Имя", "Отчество", "Дата Рождения", "Средний Балл"];
  rows: Array<{ [key: string]: string }> = [
    {
      "Фамилия": "Иванов",
      "Имя": "Иван",
      "Отчество": "Иванович",
      "Дата Рождения": "01.01.97",
      "Средний Балл": "4"
    },
    {
      "Фамилия": "Петрова",
      "Имя": "Мария",
      "Отчество": "Сергеевна",
      "Дата Рождения": "03.06.98",
      "Средний Балл": "5"
    },
    {
      "Фамилия": "Крылов",
      "Имя": "Александр",
      "Отчество": "Сергеевич",
      "Дата Рождения": "20.06.98",
      "Средний Балл": "2"
    },
    {
      "Фамилия": "Есенина",
      "Имя": "Мария",
      "Отчество": "Юрьевна",
      "Дата Рождения": "07.03.95",
      "Средний Балл": "4"
    }
  ];
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
  foundStudents: Array<{ [key: string]: string }> = [];
  isDown: boolean = true;
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

  convertToNumber(val: string): number {
    return parseInt(val, 10);
  }

  onOpenInput(e: MouseEvent, column: string): void {
    this.openFlags[column] = !this.openFlags[column];
  }

  onKey(val: string, column: string): void {
    this.foundStudents = [];
    let value = val.toLowerCase();

    if (value) {
      value = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const regexp = new RegExp(`^${value}`, "g");

      if (this.rows.length !== 0) {
        this.rows.forEach((row) => {
          const columnLowerCase = row[column].toLowerCase().trim();
          if (
            columnLowerCase.match(regexp)
          ) {
            this.foundStudents.push(row);
          }
        });
      }
    }
  }

  onToggleDown(col: string): void {
    if (this.downFlags[col]) {
      this.downFlags[col] = false;

      if (col === this.headers[this.headers.length - 1] || col === this.headers[this.headers.length - 2]) {
        this.sortLargeToSmall(col);
      } else {
        this.sortAlphabetically(col);
      }
    } else {
      this.downFlags[col] = true;

      if (col === this.headers[this.headers.length - 1] || col === this.headers[this.headers.length - 2]) {
        this.sortSmallToLarge(col);
      } else {
        this.sortBackward(col);
      }
    }
  }

  sortSmallToLarge(col: string): void {
    let sortedRows: Array<{ [key: string]: string }> = this.rows.sort((a: { [key: string]: string }, b: { [key: string]: string }) => parseInt(a[col], 10) - parseInt(b[col], 10));

    this.rows = sortedRows;
  };

  sortLargeToSmall(col: string): void {
    let sortedRows: Array<{ [key: string]: string }> = this.rows.sort((a: { [key: string]: string }, b: { [key: string]: string }) => parseInt(b[col], 10) - parseInt(a[col], 10));

    this.rows = sortedRows;
  }

  sortAlphabetically(col: string): void {
    let sortedRows: Array<{ [key: string]: string }> = this.rows.sort((a: { [key: string]: string }, b: { [key: string]: string }) =>
      a[col].localeCompare(b[col])
    );

    this.rows = sortedRows;
  }

  sortBackward(col: string): void {
    let sortedRows: Array<{ [key: string]: string }> = this.rows.sort((a: { [key: string]: string }, b: { [key: string]: string }) =>
      b[col].localeCompare(a[col])
    );

    this.rows = sortedRows;
  }

  setRows(newRows: Array<{ [key: string]: string }>): void {
    console.log(newRows);
    this.rows = newRows;
  }

  highlightController(): void {
    this.isHighlight = !this.isHighlight;
  }

  delete(rowToDelete: { [key: string]: string }) {
    this.rows = this.rows.filter((row) => row !== rowToDelete);
  }
}
