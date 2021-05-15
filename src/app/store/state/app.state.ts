import { createSelector } from "@ngrx/store";
import { Student } from "src/app/services/student";

export interface StudentsState {
    students: Student[];
    studentsLength: number;
    bufferStudents: Student[];
    headers: Student[];
    selectedStudent: Student | null;
}

export interface AppState {
    students: StudentsState;
    loaded: boolean;
    loading: boolean;
}

export const initialStudentsState: StudentsState = {
    students: [],
    studentsLength: 0,
    bufferStudents: [],
    headers: [],
    selectedStudent: null
};

export const initialAppState: AppState = {
    students: initialStudentsState,
    loaded: false,
    loading: false
};

export const selectStudentsState = (state: AppState) => state.students;

export const getLoadedState = (state: AppState) => state.loaded;

export const getLoadingState = (state: AppState) => state.loading;

export const selectStudents = createSelector(selectStudentsState, (studentsState: StudentsState) => studentsState.students);

export const selectStudentsLength = createSelector(selectStudentsState, (studentsState: StudentsState) => studentsState.studentsLength);

export const selectBufferStudents = createSelector(selectStudentsState, (studentsState: StudentsState) => studentsState.bufferStudents);

export const selectSelectedStudent = createSelector(selectStudentsState, (studentsState: StudentsState) => studentsState.selectedStudent);
