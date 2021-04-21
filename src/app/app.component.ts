import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  headers: Array<string> = ["Фамилия", "Имя", "Отчество", "Дата Рождения", "Средний Бал"];
  rows: Array<{ [key: string]: string }> = [
    {
      "Фамилия": "Иванов",
      "Имя": "Иван",
      "Отчество": "Иванович",
      "Дата Рождения": "01.01.97",
      "Средний Бал": "4"
    },
    {
      "Фамилия": "Петрова",
      "Имя": "Мария",
      "Отчество": "Сергеевна",
      "Дата Рождения": "03.06.98",
      "Средний Бал": "5"
    },
    {
      "Фамилия": "Крылов",
      "Имя": "Александр",
      "Отчество": "Сергеевич",
      "Дата Рождения": "20.06.98",
      "Средний Бал": "2"
    }
  ]

  convertToNumber(val: string) {
    return Number(val);
  }
}
