import { createAction, props } from "@ngrx/store";
import { Student } from "src/app/services/student";

export enum StudentsPageActionTypes {
    LoadStudents = "[StudentsPage] Load Students",
    AddStudent = "[StudentsPage] Add Student",
    DeleteStudent = "[StudentsPage] Delete Student",
    EditStudent = "[StudentsPage] Edit Student",
    SelectStudent = "[StudentsPage] Select Student",
    SetStudentsBuffer = "[StudentsPage] Set Students Buffer"
}

export const loadStudents = createAction(
    StudentsPageActionTypes.LoadStudents,
);

export const addStudent = createAction(
    StudentsPageActionTypes.AddStudent,
    props<{ student: Student }>(),
);

export const deleteStudent = createAction(
    StudentsPageActionTypes.DeleteStudent,
    props<{ student: Student }>(),
);

export const editStudent = createAction(
    StudentsPageActionTypes.EditStudent,
    props<{ student: Student }>(),
);

export const selectStudent = createAction(
    StudentsPageActionTypes.SelectStudent,
    props<{ student: Student }>(),
);

export const setStudentsBuffer = createAction(
    StudentsPageActionTypes.SetStudentsBuffer,
    props<{ bufferStudents: Student[] }>(),
);
