import { Location } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Student } from "src/app/services/student";
import { StudentsService } from "src/app/services/students.service";
import { StudentsPageActions } from "src/app/store/actions";
import { AppState, selectSelectedStudent, selectStudentsLength } from "src/app/store/state/app.state";

interface AllValidationControlErrors {
  controlName: string;
  errorName: string;
  errorValue: ValidationErrors;
}
interface AllValidationFormGroupErrors {
  formGroupName: string;
  errorName: string;
  errorValue: ValidationErrors;
}
@Component({
  selector: "app-component-form",
  templateUrl: "./component-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./component-form.component.css"]
})
export class ComponentFormComponent implements OnInit, OnDestroy {
  name: { firstName: string, lastName: string, middleName: string };
  studentName: FormGroup;
  dateBirthStr: string;
  dateBirth: FormControl;
  averageScoreStr: string;
  averageScore: FormControl;
  formModel: FormGroup;

  errors: AllValidationControlErrors[];
  errorsFormGroup: AllValidationFormGroupErrors[];
  messages: { [key: string]: string } = {
    "firstName": "Имя",
    "lastName": "Фамилия",
    "middleName": "Отчество",
    "dateBirth": "Дата Рождения",
    "averageScore": "Средний Балл"
  };
  submitted: boolean = false;

  get firstName(): AbstractControl | null { return this.studentName.get("firstName"); }

  get lastName(): AbstractControl | null { return this.studentName.get("lastName"); }

  get middleName(): AbstractControl | null { return this.studentName.get("middleName"); }

  isOpenCreateContent: boolean = false;
  isOpenEditContent: boolean = false;

  studentToEdit: Student | null = null;

  studentsLength: number | undefined;

  private destroy$ = new Subject<void>();

  private history: string[] = [];

  constructor(private _fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private location: Location, private store: Store<AppState>) {
    this.name = {
      firstName: "",
      lastName: "",
      middleName: ""
    };
    this.studentName = this._fb.group({
      firstName: [this.name.firstName, [Validators.required, Validators.pattern("^[А-Яа-яЁё]*$"), Validators.maxLength(20), Validators.minLength(3)]],
      lastName: [this.name.lastName, [Validators.required, Validators.pattern("^[А-Яа-яЁё]*$"), Validators.maxLength(20), Validators.minLength(3)]],
      middleName: [this.name.middleName, [Validators.required, Validators.pattern("^[А-Яа-яЁё]*$"), Validators.maxLength(20), Validators.minLength(3)]]
    }, { validators: [this.comparisonValidator] });

    this.dateBirthStr = "";
    this.dateBirth = this._fb.control(this.dateBirthStr, [Validators.required, this.dateValidator(this.getMinDate(), this.getMaxDate())]);

    this.averageScoreStr = "";
    this.averageScore = this._fb.control(this.averageScoreStr, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(5)]);

    this.formModel = this._fb.group({
      studentName: this.studentName,
      dateBirth: this.dateBirth,
      averageScore: this.averageScore
    });

    this.errors = [];
    this.errorsFormGroup = [];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  goBack(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  getMaxDate(): Date {
    const date = new Date();
    const maxYear = date.getFullYear() - 10;
    date.setFullYear(maxYear);
    return date;
  }

  getMinDate(): Date {
    const date = new Date();
    const minYear = date.getFullYear() - 100;
    date.setFullYear(minYear);
    return date;
  }

  ngOnInit(): void {
    const path = this.activeRoute.snapshot.url[0].path;
    this.isOpenCreateContent = path === "create";
    this.isOpenEditContent = path === "edit";

    this.store.select(selectSelectedStudent).pipe(
      takeUntil(this.destroy$),
    ).subscribe((student) => {
      this.studentToEdit = student;
    });

    this.store.select(selectStudentsLength).pipe(
      takeUntil(this.destroy$),
    ).subscribe((len) => {
      this.studentsLength = len;
    });

    if (this.isOpenEditContent && this.studentToEdit) {
      const { lastName, firstName, middleName, averageScore } = this.studentToEdit;
      let { dateBirth } = this.studentToEdit;
      dateBirth = dateBirth.replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1");

      this.lastName && this.lastName.setValue(lastName);
      this.firstName && this.firstName.setValue(firstName);
      this.middleName && this.middleName.setValue(middleName);
      this.dateBirth && this.dateBirth.setValue(dateBirth);
      this.averageScore && this.averageScore.setValue(averageScore);
    }

    this.formModel.valueChanges.subscribe(() => {
      this.errors = [];
      this.errorsFormGroup = [];
      this.calculateErrors(this.formModel);
    });

    this.calculateErrors(this.formModel);
  }

  ngOnDestroy(): void {
    console.log("unsubscribe in form component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  comparisonValidator(ctrl: AbstractControl): ValidationErrors | null {
    const fg = ctrl as FormGroup;
    const { firstName, lastName, middleName } = fg.value;
    return (firstName !== "" && (firstName === lastName || firstName === middleName)) ? { "equivalent": true } : null;
  }

  isFullDate(dateStr: string): boolean {
    const dateArr = dateStr.split("-");
    return (dateArr.length === 3) ? true : false;
  }

  dateValidator(minDate: Date, maxDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateStr: string = control.value;

      if (!this.isFullDate(dateStr)) { return null; }

      const date = new Date(dateStr);
      const year = date.getFullYear();
      const maxYear = maxDate.getFullYear();
      const minYear = minDate.getFullYear();
      return (year < minYear || year > maxYear) ? { "maxMinYear": { "maxYear": maxYear, "minYear": minYear, "actual": year } } : null;
    };
  }

  calculateErrors(form: FormGroup | FormArray): AllValidationControlErrors[] {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        const controlErrors: ValidationErrors | null = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach(keyError => {
            this.errors.push({
              controlName: field,
              errorName: keyError,
              errorValue: controlErrors[keyError]
            });
          });
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        if (control instanceof FormGroup) {
          const formGroupErrors: ValidationErrors | null = control.errors;
          if (formGroupErrors) {
            Object.keys(formGroupErrors).forEach(keyError => {
              this.errorsFormGroup.push({
                formGroupName: field,
                errorName: keyError,
                errorValue: formGroupErrors[keyError]
              });
            });
          }
        }
        this.errors = this.errors.concat(this.calculateErrors(control));
        return;
      }
    });

    this.errors = this.errors.filter((error, index, self) => self.findIndex(t => {
      return t.controlName === error.controlName && t.errorName === error.errorName;
    }) === index);
    return this.errors;
  }

  getErrorsControl(control: string): AllValidationControlErrors[] | undefined {
    return this.errors.filter((error) => error.controlName === control);
  }

  getErrorsFormGroup(formGroup: string): AllValidationFormGroupErrors[] | undefined {
    return this.errorsFormGroup.filter((error) => error.formGroupName === formGroup);
  }

  getErrorMessage(error: AllValidationControlErrors | undefined): string {
    if (error) {
      switch (error.errorName) {
        case "required":
          return `Поле ${this.messages[error.controlName]} не должно быть пустым`;
        case "pattern":
          if (["firstName", "lastName", "middleName"].includes(error.controlName)) {
            return `В поле ${this.messages[error.controlName]} допустимы только буквы русского алфавита от а до я в любом регистре, без пробелов`;
          }
          if (error.controlName === "averageScore") {
            return `В поле ${this.messages[error.controlName]} допустимы только цифры 1-5`;
          }
          return "";
        case "maxlength":
          if (["firstName", "lastName", "middleName"].includes(error.controlName)) {
            return `Длина поля ${this.messages[error.controlName]} не должна превышать ${error.errorValue.requiredLength} символов`;
          }
          return "";
        case "minlength":
          if (["firstName", "lastName", "middleName"].includes(error.controlName)) {
            return `Длина поля ${this.messages[error.controlName]} должна быть как минимум ${error.errorValue.requiredLength} символов`;
          }
          return "";
        case "maxMinYear":
          return `В поле ${this.messages[error.controlName]} год рождения должен быть не ранее ${error.errorValue.maxYear} года и не позднее ${error.errorValue.minYear}`;
        case "max":
          if (error.controlName === "averageScore") {
            return `В поле ${this.messages[error.controlName]} значение не должно превышать ${error.errorValue.max}`;
          }
          return "";
        case "min":
          if (error.controlName === "averageScore") {
            return `В поле ${this.messages[error.controlName]} значение не должно быть меньше ${error.errorValue.min}`;
          }
          return "";
        default:
          return `Неизвестная ошибка в поле ${error.errorName}`;
      }
    } else {
      return "";
    }
  }

  getErrorFormGroupMessage(error: AllValidationFormGroupErrors | undefined): string {
    if (error) {
      switch (error.errorName) {
        case "equivalent":
          console.log(error.errorName);
          return `Имя не должно совпадать ни с фамилией ни с отчеством`;
        default:
          return `Неизвестная ошибка в имени ${error.errorName}`;
      }
    } else {
      return "";
    }
  }

  addNewStudent(student: Student): void {
    this.store.dispatch(StudentsPageActions.addStudent({ student }));
    this.goBack();
  }

  editStudent(student: Student): void {
    this.store.dispatch(StudentsPageActions.editStudent({ student }));
    this.goBack();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.errors.length === 0) {
      const { lastName, firstName, middleName } = this.studentName.value;
      const date = this.dateBirth.value;
      const dateStr = date.toString().replace(/(\d{4})-(\d{2})-(\d{2})/, "$3.$2.$1");
      const score = this.averageScore.value;
      let id: string = "0";
      if (this.studentToEdit) {
        id = this.studentToEdit.id;
      }
      if (this.isOpenCreateContent) {
        if (this.studentsLength) {
          id = this.studentsLength.toString();
        }
      }
      const student = {
        id: id,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        dateBirth: dateStr,
        averageScore: score
      };
      console.log("on submit form", student);
      if (this.isOpenCreateContent) {
        console.log("add");
        this.addNewStudent(student);
      } else if (this.isOpenEditContent) {
        console.log("edit");
        this.editStudent(student);
      }
    }
  }
}
