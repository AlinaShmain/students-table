import { createAction, props } from "@ngrx/store";
import { Student } from "src/app/services/student";


export enum StudentsApiActionTypes {
    StudentsLoadedSuccess = "[Students/API] Students Loaded Success",
    StudentsLoadedError = "[Students/API] Students Loaded Error",
    StudentAddedSuccess = "[Students/API] Student Added Success",
    StudentAddedError = "[Students/API] Student Added Error",
    StudentDeletedSuccess = "[Students/API] Student Deleted Success",
    StudentDeletedError = "[Students/API] Student Deleted Error",
    StudentEditedSuccess = "[Students/API] Student Edited Success",
    StudentEditedError = "[Students/API] Student Edited Error",
}

export const studentsLoadedSuccess = createAction(
    StudentsApiActionTypes.StudentsLoadedSuccess,
    props<{ students: Student[] }>(),
);

export const studentsLoadedError = createAction(
    StudentsApiActionTypes.StudentsLoadedError,
    props<{ error: Error }>(),
);

export const studentAddedSuccess = createAction(
    StudentsApiActionTypes.StudentAddedSuccess,
    props<{ student: Student }>(),
);

export const studentAddedError = createAction(
    StudentsApiActionTypes.StudentAddedError,
    props<{ error: Error }>(),
);

export const studentDeletedSuccess = createAction(
    StudentsApiActionTypes.StudentDeletedSuccess,
    props<{ student: Student }>(),
);

export const studentDeletedError = createAction(
    StudentsApiActionTypes.StudentDeletedError,
    props<{ error: Error }>(),
);

export const studentEditedSuccess = createAction(
    StudentsApiActionTypes.StudentEditedSuccess,
    props<{ student: Student }>(),
);

export const studentEditedError = createAction(
    StudentsApiActionTypes.StudentEditedError,
    props<{ error: Error }>(),
);
