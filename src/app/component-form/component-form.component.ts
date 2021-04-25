import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-component-form",
  templateUrl: "./component-form.component.html",
  styleUrls: ["./component-form.component.css"]
})
export class ComponentFormComponent implements OnInit {
  formModel: FormGroup;
  studentName: FormGroup;
  name: { firstName: string, lastName: string, middleName: string };

  _rows: Array<{ [key: string]: string }> = [];

  @Input() set rows(value: Array<{ [key: string]: string }>) {
    this._rows = value;
  }

  get rows(): Array<{ [key: string]: string }> {
    return this._rows || "Unknown";
  }

  @Output()
  emitSetRows: EventEmitter<Array<{ [key: string]: string }>> = new EventEmitter<Array<{ [key: string]: string }>>();

  constructor() {
    this.name = {
      firstName: "",
      lastName: "",
      middleName: ""
    };
    this.studentName = new FormGroup({
      firstName: new FormControl(this.name.firstName, [Validators.required]),
      lastName: new FormControl(this.name.lastName, [Validators.required]),
      middleName: new FormControl(this.name.middleName, [Validators.required])
    });
    this.formModel = new FormGroup({
      studentName: this.studentName
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {lastName, firstName, middleName} = this.studentName.value;
    const newRow = {
      "Фамилия": lastName,
      "Имя": firstName,
      "Отчество": middleName,
      "Дата Рождения": "01.01.97",
      "Средний Балл": "4"
    };
    this.rows.push(newRow);
    this.emitSetRows.emit(this.rows);
  }
}
